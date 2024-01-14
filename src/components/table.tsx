import "../App.css";

interface Props {
  tableResult: any;
  openAIKey: any;
  setOpenAIKey: (openAIKey: any) => void;
}

export default function Table({ tableResult, openAIKey, setOpenAIKey }: Props) {
  if (Array.isArray(tableResult)) {
    if (tableResult.length === 0) {
      return <div className="nontable-result">0 rows returned</div>;
    }
    return (
      <div className="table-container">
        <table className="simple-table">
          <thead>
            <tr>
              {Object.keys(tableResult[0]).map(
                (property, index) =>
                  property !== "id" && <th key={index}>{property}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableResult.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map(
                  (property, index2) =>
                    property !== "id" && <td key={index2}>{item[property]}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (tableResult instanceof Object) {
    if ("affectedRows" in tableResult) {
      return (
        <div className="nontable-result">
          Success, {tableResult.affectedRows} row(s) affected
        </div>
      );
    } else {
      return (
        <div className="nontable-result">
          I haven't implemented displaying this result yet
        </div>
      );
    }
  } else if (tableResult === "loading") {
    return (
      <div className="table-container">
        <div className="loading-container">
          <img className="loading-img" src="./static/images/loading.png" />
        </div>
      </div>
    );
  } else if (tableResult === "need_key") {
    return (
      <div className="nontable-result">
        <div className="gpt-instructions">
          To use the GPT feature you'll need an OpenAI API key. Enter your key
          below and it will automatically be saved.
        </div>
        <input
          type="text"
          className="gpt-key-textarea"
          value={openAIKey}
          onChange={(val) => {
            setOpenAIKey(val.target.value);
            localStorage.setItem("openai", val.target.value);
          }}
          placeholder="sk-..."
        />
      </div>
    );
  } else {
    if (tableResult === null) {
      return <div className="nontable-result">Failure, check your syntax</div>;
    }
    return <div className="nontable-result">Results displayed here</div>;
  }
}
