import { useState } from "react";
import "../App.css";

export default function Editor() {
  const [currentQuery, setCurrentQuery] = useState("");

  async function executeQuery() {
    console.log(await mysql.queryAPI.makeQuery(currentQuery));
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
