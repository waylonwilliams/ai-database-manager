import "../App.css";

interface Props {
  currentQuery: any;
  setTableResult: (val: any) => void;
  setSelectedDB: (val: any) => void;
  selectedDB: any;
  SetMySQLLogin: (val: boolean) => void;
}

export default function Buttons({
  currentQuery,
  setTableResult,
  setSelectedDB,
  selectedDB,
  SetMySQLLogin,
}: Props) {
  async function executeQuery() {
    if (
      currentQuery.startsWith("USE ") || // temporary fix, ideally force uppercase and just rely on that
      currentQuery.startsWith("Use ") ||
      currentQuery.startsWith("use ")
    ) {
      setSelectedDB(currentQuery.slice(4));
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
      setTableResult(result); // failed query sends null anyways?
    }
  }

  return (
    <div className="button-div">
      <button onClick={executeQuery} className="button">
        Execute
      </button>
      <button className="button2">GPT</button>
      <button
        className="button-disconnect"
        onClick={() => SetMySQLLogin(false)}
      >
        Disconnect
      </button>
    </div>
  );
}
