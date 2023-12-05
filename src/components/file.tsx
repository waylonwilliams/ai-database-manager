import { useEffect } from "react";
import "../App.css";

// how to map actual tables and such
export default function Selector() {
  let files = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        files = await mysql.dbTableAPI.getDbTableInfo();
        console.log("Returned to render side", files);
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
