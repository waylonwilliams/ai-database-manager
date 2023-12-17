import "../App.css";
import HightlightEditor from "./importEditor";

interface Props {
  currentQuery: any;
  setCurrentQuery: (val: any) => void;
  setSelectedDB: (val: any) => void;
  selectedDB: any;
  setTableResult: (val: any) => void;
}

export default function Editor({
  currentQuery,
  setCurrentQuery,
  setSelectedDB,
  selectedDB,
  setTableResult,
}: Props) {
  async function executeQuery() {
    setTableResult("loading");
    if (
      currentQuery.startsWith("USE ") || // there are many other valid ways to call use, it won't set selected db if you do it one of those ways
      currentQuery.startsWith("Use ") ||
      currentQuery.startsWith("use ")
    ) {
      setSelectedDB(currentQuery.slice(4));
    }
    let result = await mysql.queryAPI.makeQuery("USE " + selectedDB);
    result = await mysql.queryAPI.makeQuery(currentQuery);
    if (Array.isArray(result)) {
      console.log(result);
      let i = 1;
      for (let element of result) {
        for (const attribute in element) {
          // turns objects into strings so the table can display them
          if (typeof element[attribute] === "object") {
            element[attribute] = JSON.stringify(element[attribute]);
          }
        }
        if ("id" in result) {
          break;
        }
        element.id = i++;
      }
      setTableResult(result);
    } else {
      setTableResult(result);
    }
  }

  async function executeGPT() {
    setTableResult("loading");
    let tables = [];
    let temp_dbs = {};
    try {
      temp_dbs = await mysql.dbTableAPI.getDbTableInfo();
      for (const key in temp_dbs) {
        tables = await mysql.tableAPI.getTableInfo(key);
        if (tables !== "err") {
          temp_dbs[key] = {};
          for (const table in tables) {
            const columns = await mysql.columnAPI.getColumnInfo(
              tables[table]["Tables_in_" + key]
            );
            temp_dbs[key][tables[table]["Tables_in_" + key]] = [];
            for (const col in columns) {
              temp_dbs[key][tables[table]["Tables_in_" + key]].push(
                `${columns[col].Field} ${columns[col].Type}`
              );
            }
          }
        }
      }
      const generatedQuery = await gpt.gptAPI.makeRequest(
        JSON.stringify(temp_dbs),
        currentQuery
      );
      if (generatedQuery === -1) {
        setTableResult("need_key");
      }
      setCurrentQuery(generatedQuery.message.content);
      const result = await mysql.queryAPI.makeQuery(
        generatedQuery.message.content
      );
      if (Array.isArray(result)) {
        let i = 1;
        for (let element of result) {
          for (const attribute in element) {
            // turns objects into strings so the table can display them
            if (typeof element[attribute] === "object") {
              element[attribute] = JSON.stringify(element[attribute]);
            }
          }
          if ("id" in result) {
            break;
          }
          element.id = i++;
        }
        setTableResult(result);
      } else {
        setTableResult(result);
      }
    } catch (error) {
      console.log("Error fetching database and table info:", error);
    }
  }

  return (
    <>
      <div className="textarea">
        <HightlightEditor
          currentQuery={currentQuery}
          setCurrentQuery={setCurrentQuery}
        />
        <div className="buttons">
          <button className="execution_buttons" onClick={executeQuery}>
            Execute
          </button>
          <button className="execution_buttons" onClick={executeGPT}>
            GPT
          </button>
        </div>
      </div>
    </>
  );
}
