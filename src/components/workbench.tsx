import { useState } from "react";
import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";
import Close from "./disconnect";

interface Props {
  SetMySQLLogin: any;
}

export default function Workbench({ SetMySQLLogin }: Props) {
  const [tableResult, setTableResult] = useState("");
  const [selectedDB, setSelectedDB] = useState("");

  return (
    <div className="row">
      <div className="column left">
        <Editor
          setTableResult={setTableResult}
          setSelectedDB={setSelectedDB}
          selectedDB={selectedDB}
        />
        <Table tableResult={tableResult} />
      </div>
      <div className="column right">
        <Close SetMySQLLogin={SetMySQLLogin} />
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
