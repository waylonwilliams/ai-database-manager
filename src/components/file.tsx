import { useCallback, useEffect, useState } from "react";
import "../App.css";

interface Props {
  tableResult: any;
  setTableResult: any;
  selectedDB: any;
  setSelectedDB: any;
  SetMySQLLogin: any;
  setLoading: (loading: boolean) => void;
}

// how to map actual tables and such
export default function Selector({
  tableResult,
  setTableResult,
  selectedDB,
  setSelectedDB,
  SetMySQLLogin,
  setLoading,
}: Props) {
  let [dbs, setdbs] = useState<{ [key: string]: string[] }>({});
  let tables = [];

  async function tableSelect(e: React.MouseEvent<HTMLDivElement>) {
    const curDB = e.currentTarget.id;
    const curTable = e.currentTarget.innerHTML;
    setSelectedDB(curDB);
    let result = await window.mysql.queryAPI.makeQuery("USE " + curDB);
    result = await window.mysql.queryAPI.makeQuery(
      "SELECT * FROM " + curTable + " LIMIT 1000"
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
  }

  const dbSelect = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      setSelectedDB(e.currentTarget.innerHTML);
    },
    [setSelectedDB]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (tableResult === "loading") {
        return;
      }
      let temp_dbs: { [key: string]: any } = {};
      try {
        temp_dbs = await window.mysql.dbTableAPI.getDbTableInfo();
        for (let key in temp_dbs) {
          tables = await window.mysql.tableAPI.getTableInfo(key);
          if (tables !== "err") {
            temp_dbs[key] = tables.map(
              (table: { [key: string]: any }) => table["Tables_in_" + key]
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
          setLoading(false);
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
