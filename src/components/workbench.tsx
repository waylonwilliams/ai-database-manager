import { useState } from "react";
import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";

export default function Workbench() {
  const [tableResult, setTableResult] = useState("");

  return (
    <div className="row">
      <div className="column left">
        <Editor setTableResult={setTableResult} />
        <Table tableResult={tableResult} />
      </div>
      <div className="column right">
        <Selector />
      </div>
    </div>
  );
}
