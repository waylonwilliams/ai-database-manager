import { useState } from "react";
import "../App.css";
import Table from "./table";
import Selector from "./file";
import Editor from "./editor";

interface Props {
  SetMySQLLogin: any;
  setLoading: (loading: boolean) => void;
}

export default function Workbench({ SetMySQLLogin, setLoading }: Props) {
  const [tableResult, setTableResult] = useState("");
  const [selectedDB, setSelectedDB] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [openAIKey, setOpenAIKey] = useState(localStorage.getItem("openai"));

  return (
    <div className="row">
      <div className="column right">
        <Selector
          tableResult={tableResult}
          setTableResult={setTableResult}
          selectedDB={selectedDB}
          setSelectedDB={setSelectedDB}
          SetMySQLLogin={SetMySQLLogin}
          setLoading={setLoading}
        />
      </div>
      <div className="column left">
        <Editor
          currentQuery={currentQuery}
          setCurrentQuery={setCurrentQuery}
          setSelectedDB={setSelectedDB}
          selectedDB={selectedDB}
          setTableResult={setTableResult}
          openAIKey={openAIKey}
        />
        <Table tableResult={tableResult} setOpenAIKey={setOpenAIKey} />
      </div>
    </div>
  );
}
