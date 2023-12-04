import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";

export default function Workbench() {
  return (
    <div className="row">
      <div className="column left">
        <Editor />
        <Table />
      </div>
      <div className="column right">
        <Selector />
      </div>
    </div>
  );
}
