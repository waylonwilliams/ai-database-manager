import "../App.css";
import HightlightEditor from "./importEditor";

interface Props {
  currentQuery: any;
  setCurrentQuery: (val: any) => void;
  setSelectedDB: (val: any) => void;
  selectedDB: any;
  setTableResult: (val: any) => void;
  openAIKey: any;
}

export default function Editor({
  currentQuery,
  setCurrentQuery,
  setSelectedDB,
  selectedDB,
  setTableResult,
  openAIKey,
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
    let result = await window.mysql.queryAPI.makeQuery("USE " + selectedDB);
    result = await window.mysql.queryAPI.makeQuery(currentQuery);
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
    let tables: any = [];
    let temp_dbs: { [key: string]: { [tableName: string]: any[] } } = {};
    try {
      temp_dbs = await window.mysql.dbTableAPI.getDbTableInfo();
      for (const key in temp_dbs) {
        tables = await window.mysql.tableAPI.getTableInfo(key);
        if (tables !== "err") {
          temp_dbs[key] = {};
          for (const table in tables) {
            const tableName: string = tables[table]["Tables_in_" + key];
            const columns =
              await window.mysql.columnAPI.getColumnInfo(tableName);
            temp_dbs[key][tableName] = [];
            for (const col in columns) {
              temp_dbs[key][tableName].push(
                `${columns[col].Field} ${columns[col].Type}`
              );
            }
          }
        }
      }
      const generatedQuery = await window.gpt.gptAPI.makeRequest(
        JSON.stringify(temp_dbs),
        currentQuery,
        openAIKey
      );
      console.log(generatedQuery);
      console.log(generatedQuery.message.content);
      if (generatedQuery.message.content === "-1") {
        console.log(
          "here, i should just break after this so false query isn't executed"
        );
        setTableResult("need_key");
        return;
      }
      setCurrentQuery(generatedQuery.message.content);
      const result = await window.mysql.queryAPI.makeQuery(
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
      setTableResult("need_key");
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
