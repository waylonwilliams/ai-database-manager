import "../App.css";

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
    if (
      currentQuery.startsWith("USE ") || // temporary fix, ideally force uppercase and just rely on that
      currentQuery.startsWith("Use ") ||
      currentQuery.startsWith("use ")
    ) {
      setSelectedDB(currentQuery.slice(4));
    }
    let result = await mysql.queryAPI.makeQuery("USE " + selectedDB); // 2 queries does make this less efficient, but solves the issue, i could be more organized though
    result = await mysql.queryAPI.makeQuery(currentQuery);
    if (Array.isArray(result)) {
      let i = 1;
      for (let element of result) {
        if ("id" in result) {
          break;
        }
        element.id = i++;
      }
      setTableResult(result);
    } else {
      setTableResult(result); // failed query sends null anyways?
    }
  }

  async function executeGPT() {
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
              console.log(columns[col]);
              console.log(`${columns[col].Field} ${columns[col].Type}`);
              temp_dbs[key][tables[table]["Tables_in_" + key]].push(
                `${columns[col].Field} ${columns[col].Type}`
              );
            }
          }
        }
      }

      // execute the query
      const generatedQuery = await gpt.gptAPI.makeRequest(
        JSON.stringify(temp_dbs),
        currentQuery
      );
      console.log("Here is the query: " + generatedQuery.message.content);
      const result = await mysql.queryAPI.makeQuery(
        generatedQuery.message.content
      );
      if (Array.isArray(result)) {
        let i = 1;
        for (let element of result) {
          if ("id" in result) {
            break;
          }
          element.id = i++;
        }
        setTableResult(result);
      } else {
        setTableResult(result); // failed query sends null anyways?
      }
      // execute the query
    } catch (error) {
      console.log("Error fetching database and table info:", error);
    }
  }

  return (
    <div className="textarea">
      <textarea
        className="field"
        value={currentQuery}
        onChange={(val) => {
          setCurrentQuery(val.target.value);
        }}
        placeholder="SELECT * FROM..."
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
  );
}
