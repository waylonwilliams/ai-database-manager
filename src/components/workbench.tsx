import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";

export default function Workbench({ MySQLLogin }) {
  return (
    <div className="row">
      <div className="column left">
        <Editor MySQLLogin={MySQLLogin} />
        <Table />
      </div>
      <div className="column right">
        <Selector />
      </div>
    </div>
  );
}
