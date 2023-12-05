import { useState } from "react";
import "../App.css";

interface Props {
  setTableResult: (val: any) => void;
  setSelectedDB: any;
}

export default function Editor({ setTableResult, setSelectedDB }: Props) {
  const [currentQuery, setCurrentQuery] = useState("");

  async function executeQuery() {
    console.log("EXEecuting query");
    if (currentQuery.startsWith("USE ")) {
      // this assumes it will be uppercase, it probably will be if i implement code editor style capitalization?
      setSelectedDB(currentQuery.slice(4));
    }
    let result = await mysql.queryAPI.makeQuery(currentQuery);
    if (Array.isArray(result)) {
      let i = 1;
      for (let element of result) {
        if ("id" in result) {
          break;
        }
        element.id = i++;
      }
      setTableResult(result);
    } else {
      setTableResult(result);
    }
  }

  return (
    <>
      <button onClick={executeQuery} className="button">
        Execute
      </button>
      <button className="button2">GPT</button>
      <textarea
        className="field"
        value={currentQuery}
        onChange={(val) => {
          setCurrentQuery(val.target.value);
        }}
      />
    </>
  );
}
