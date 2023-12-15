import { useState } from "react";
import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";
import Buttons from "./buttons";

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
        <Buttons
          currentQuery={currentQuery}
          setTableResult={setTableResult}
          setSelectedDB={setSelectedDB}
          selectedDB={selectedDB}
          SetMySQLLogin={SetMySQLLogin}
        />
        <Selector
          tableResult={tableResult}
          setTableResult={setTableResult}
          selectedDB={selectedDB}
          setSelectedDB={setSelectedDB}
        />
      </div>
      <div className="column left">
        <Editor currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} />
        <Table tableResult={tableResult} />
      </div>
    </div>
  );
}
