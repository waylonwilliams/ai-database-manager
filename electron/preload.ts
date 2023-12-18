import { contextBridge, ipcRenderer } from "electron";
import * as mysql from "mysql2";
import OpenAI from "openai";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));

// -----------------------------------------------------------------
var mysqlConnector: any = null;

contextBridge.exposeInMainWorld("mysql", {
  connectAPI: {
    connect(host: string, user: string, pass: string, port: number) {
      return new Promise((resolve) => {
        mysqlConnector = mysql.createConnection({
          host: host,
          user: user,
          password: pass,
          port: port,
        });
        mysqlConnector.connect(function (err: Error) {
          if (err) {
            resolve(null);
          } else {
            resolve(1); // previously returned the connector but that isn't necessary?
          }
        });
      });
    },
  },
  queryAPI: {
    makeQuery(query: string) {
      return new Promise((resolve) => {
        if (mysqlConnector !== null) {
          mysqlConnector.query(query, function (err: Error, result: any) {
            if (err) {
              console.log("Failed query", err);
              return resolve(null);
            } else {
              return resolve(result);
            }
          });
        }
      });
    },
  },
  dbTableAPI: {
    getDbTableInfo() {
      return new Promise((resolve) => {
        let post: { [key: string]: any[] } = {};
        if (mysqlConnector !== null) {
          mysqlConnector.query(
            "SHOW DATABASES",
            function (err: Error, result: any) {
              if (err) {
                console.log("Failed to get list of databases");
                resolve({});
              } else {
                for (let element of result) {
                  if (
                    element.Database !== "information_schema" &&
                    element.Database !== "mysql" &&
                    element.Database !== "performance_schema" &&
                    element.Database !== "sys"
                  ) {
                    post[element.Database] = [];
                  }
                }
                resolve(post);
              }
            },
          );
        } else {
          resolve({});
        }
      });
    },
  },
  tableAPI: {
    getTableInfo(db: string) {
      return new Promise((resolve) => {
        mysqlConnector.query("USE " + db, function (err: Error) {
          if (err) {
            console.log("Failed to open a db");
            resolve("err");
          } else {
            mysqlConnector.query(
              "SHOW TABLES",
              function (err: Error, result: any) {
                if (err) {
                  console.log("Failed to show tables");
                  resolve("err");
                } else {
                  resolve(result);
                }
              },
            );
          }
        });
      });
    },
  },
  columnAPI: {
    getColumnInfo(table: string) {
      return new Promise((resolve) => {
        mysqlConnector.query(
          "DESCRIBE " + table,
          function (err: Error, result: any) {
            if (err) {
              console.log("Failed to get table columns info", table);
              resolve("err");
            } else {
              resolve(result);
            }
          },
        );
      });
    },
  },
});

contextBridge.exposeInMainWorld("postgre", {
  queryAPI: {
    getMeow() {
      return 4;
    },
  },
});

contextBridge.exposeInMainWorld("gpt", {
  gptAPI: {
    async makeRequest(database_info: string, request: string, openAIKey: any) {
      if (openAIKey !== null) {
        var openai = new OpenAI({ apiKey: openAIKey, dangerouslyAllowBrowser: true });
      } else {
        return {message: {content: "-1"}};
      }
      try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that writes MySQL queries for users on a database management system. Respond only with the MySQL query the user requests. The user will provide you with information about their MySQL connection including database names, table names, and column types.",
          },
          {
            role: "user",
            content: `Here is some information about the MySQL connection: ${
              database_info.slice(0, 4076)}`, // limits it to 4076 characters includes preface, preventing going over character limit, ideally let this cleanly go into another prompt
          },
          { role: "assistant", content: "" },
          {
            role: "user",
            content: `Using the database information previously given, write a MySQL query that satisfies this request, respond solely with the query: ${request.slice(0, 4066)}`, // just for antibugging
          },
        ],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0].message.content);
      return completion.choices[0];
    } catch (err) {
      console.log(err);
      return {message: {content: "-1"}};
    }
    },
  },
});

contextBridge.exposeInMainWorld("editor", {
  hlight: {
    makeHighlight(code: any) {
      const h = highlight(code, languages.sql);
      console.log(typeof h);
      return h;
    },
  },
})


// -----------------------------------------------------------------

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// --------- Preload scripts loading ---------
function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"],
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
