import { useEffect } from "react";
import "../App.css";

// how to map actual tables and such
export default function Selector() {
  let dbs = {};
  let tables = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        dbs = await mysql.dbTableAPI.getDbTableInfo();
        console.log("Returned to render side", dbs);
        for (let key in dbs) {
          tables = await mysql.tableAPI.getTableInfo(key);
          dbs[key] = tables.map((table: Object) => table["Tables_in_" + key]);
        }
        console.log(dbs);
      } catch (error) {
        console.error("Error fetching database and table info:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="side-column" id="fileList">
      <div className="file-option-db">Meow db</div>
      <div className="file-option">Table 1</div>
      <div className="file-option">Table 2</div>
      <div className="file-option">Table 3</div>
      <div className="file-option-db">Other db</div>
      <div className="file-option">Table 99</div>
    </div>
  );
}
