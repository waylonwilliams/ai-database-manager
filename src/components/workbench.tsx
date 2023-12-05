import { useState } from "react";
import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";

export default function Workbench() {
  const [tableResult, setTableResult] = useState("");
  const [selectedDB, setSelectedDB] = useState("");

  return (
    <div className="row">
      <div className="column left">
        <Editor setTableResult={setTableResult} setSelectedDB={setSelectedDB} />
        <Table tableResult={tableResult} />
      </div>
      <div className="column right">
        <Selector
          tableResult={tableResult}
          setTableResult={setTableResult}
          selectedDB={selectedDB}
          setSelectedDB={setSelectedDB}
        />
      </div>
    </div>
  );
}
