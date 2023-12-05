import { useEffect, useState } from "react";
import "../App.css";

// how to map actual tables and such
export default function Selector() {
  let [dbs, setdbs] = useState({});
  let tables = [];

  useEffect(() => {
    const fetchData = async () => {
      let temp_dbs = {};
      try {
        temp_dbs = await mysql.dbTableAPI.getDbTableInfo();
        for (let key in temp_dbs) {
          tables = await mysql.tableAPI.getTableInfo(key);
          temp_dbs[key] = tables.map(
            (table: Object) => table["Tables_in_" + key]
          );
        }
        setdbs(temp_dbs);
      } catch (error) {
        console.log("Error fetching database and table info:", error);
      }
    };
    fetchData();
  }, []);

  console.log(dbs);

  return (
    <div className="side-column" id="fileList">
      {Object.keys(dbs).map((property) => (
        <div key={property}>
          <div className="file-option-db">{property}</div>
          {dbs[property].map((item: string) => (
            <div key={item} className="file-option">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
