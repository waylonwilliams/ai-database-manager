import "../App.css";

interface Props {
  tableResult: any;
}

export default function Table({ tableResult }: Props) {
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
          <img className="loading-img" src="../../files/loading.jpeg" />
        </div>
      </div>
    );
  } else {
    if (tableResult === null) {
      return <div className="nontable-result">Failure, check your syntax</div>;
    }
    return <div className="nontable-result">Results displayed here</div>;
  }
}
