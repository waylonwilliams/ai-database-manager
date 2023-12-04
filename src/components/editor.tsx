import { useState } from "react";
import "../App.css";

interface Props {
  setTableResult: (val: any) => void;
}

export default function Editor({ setTableResult }: Props) {
  const [currentQuery, setCurrentQuery] = useState("");

  async function executeQuery() {
    let result = await mysql.queryAPI.makeQuery(currentQuery);
    if (Array.isArray(result)) {
      if (result.length === 0) {
        setTableResult(""); // empty quotes means show an empty table
      }
      let i = 1;
      for (let element of result) {
        if ("id" in result) {
          break;
        }
        element.id = i++;
      }
      setTableResult(result);
    } else if (result === null) {
      // failure message
    } else if ("rowsAffected" in result) {
      //
    } else {
      console.log("Currently not supporting this return type");
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
