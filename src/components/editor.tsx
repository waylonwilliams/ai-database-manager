import { useState } from "react";
import "../App.css";

export default function Editor({ MySQLLogin }) {
  const [query, setQuery] = useState("");

  async function executeQuery() {
    console.log(await mysql.queryAPI.query(MySQLLogin, query));
  }

  return (
    <>
      <button onClick={executeQuery} className="button">
        Execute
      </button>
      <button className="button2">GPT</button>
      <textarea
        className="field"
        value={query}
        onChange={(val) => {
          setQuery(val.target.value);
        }}
      />
    </>
  );
}
