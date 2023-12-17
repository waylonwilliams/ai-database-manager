import { useCallback, useEffect, useState } from "react";
import "../App.css";

interface Props {
  tableResult: any;
  setTableResult: any;
  selectedDB: any;
  setSelectedDB: any;
  SetMySQLLogin: any;
}

// how to map actual tables and such
export default function Selector({
  tableResult,
  setTableResult,
  selectedDB,
  setSelectedDB,
  SetMySQLLogin,
}: Props) {
  let [dbs, setdbs] = useState({});
  let tables = [];

  async function tableSelect(e: React.MouseEvent<HTMLDivElement>) {
    const curDB = e.currentTarget.id;
    const curTable = e.currentTarget.innerHTML;
    setSelectedDB(curDB);
    let result = await mysql.queryAPI.makeQuery("USE " + curDB);
    result = await mysql.queryAPI.makeQuery("SELECT * FROM " + curTable);
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
  }

  const dbSelect = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      setSelectedDB(e.currentTarget.innerHTML);
      let result = await mysql.queryAPI.makeQuery(
        "USE " + e.currentTarget.innerHTML
      );
    },
    [setSelectedDB]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (tableResult === "loading") {
        return;
      }
      let temp_dbs = {};
      try {
        temp_dbs = await mysql.dbTableAPI.getDbTableInfo();
        for (let key in temp_dbs) {
          tables = await mysql.tableAPI.getTableInfo(key);
          if (tables !== "err") {
            temp_dbs[key] = tables.map(
              (table: Object) => table["Tables_in_" + key]
            );
          }
        }
        setdbs(temp_dbs);
      } catch (error) {
        console.log("Error fetching database and table info:", error);
      }
    };
    fetchData();
  }, [tableResult]);

  return (
    <>
      <div
        className="disconnect"
        onClick={() => {
          SetMySQLLogin(false);
        }}
      >
        Disconnect
      </div>
      <div className="selector">
        <div className="joverflow">
          {Object.keys(dbs).map((property) => (
            <div key={property}>
              {property === selectedDB && (
                <div
                  onClick={dbSelect}
                  className="option-selected file-option-db"
                >
                  {property}
                </div>
              )}
              {property !== selectedDB && (
                <div
                  onClick={dbSelect}
                  className="option-deselected file-option-db"
                >
                  {property}
                </div>
              )}
              {dbs[property].map((item: string) => (
                <div
                  key={item}
                  id={property}
                  onClick={tableSelect}
                  className="option-table"
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
