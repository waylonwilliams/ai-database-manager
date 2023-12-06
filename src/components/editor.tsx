import { useState } from "react";
import "../App.css";

interface Props {
  setTableResult: (val: any) => void;
  setSelectedDB: (val: any) => void;
  selectedDB: any;
}

export default function Editor({
  setTableResult,
  setSelectedDB,
  selectedDB,
}: Props) {
  const [currentQuery, setCurrentQuery] = useState("");

  async function executeQuery() {
    if (
      currentQuery.startsWith("USE ") || // temporary fix, ideally force uppercase and just rely on that
      currentQuery.startsWith("Use ") ||
      currentQuery.startsWith("use ")
    ) {
      setSelectedDB(currentQuery.slice(4)); // slice happening in line
    }
    let result = await mysql.queryAPI.makeQuery("USE " + selectedDB); // 2 queries does make this less efficient, but solves the issue, i could be more organized though
    result = await mysql.queryAPI.makeQuery(currentQuery);
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

  console.log("Selected db", selectedDB);

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
