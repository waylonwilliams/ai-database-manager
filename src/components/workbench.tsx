import { useState } from "react";
import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";

interface Props {
  SetMySQLLogin: any;
}

export default function Workbench({ SetMySQLLogin }: Props) {
  const [tableResult, setTableResult] = useState("");
  const [selectedDB, setSelectedDB] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");

  return (
    <div className="row">
      <div className="column right">
        <Selector
          tableResult={tableResult}
          setTableResult={setTableResult}
          selectedDB={selectedDB}
          setSelectedDB={setSelectedDB}
          SetMySQLLogin={SetMySQLLogin}
        />
      </div>
      <div className="column left">
        <Editor
          currentQuery={currentQuery}
          setCurrentQuery={setCurrentQuery}
          setSelectedDB={setSelectedDB}
          selectedDB={selectedDB}
          setTableResult={setTableResult}
        />
        <Table tableResult={tableResult} />
      </div>
    </div>
  );
}
