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
      <table className="simple-table">
        <thead>
          <tr>
            {Object.keys(tableResult[0]).map(
              (property) => property !== "id" && <th>{property}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableResult.map((item) => (
            <tr>
              {Object.keys(item).map(
                (property) => property !== "id" && <td>{item[property]}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (tableResult instanceof Object) {
    if ("affectedRows" in tableResult) {
      return (
        <div className="nontable-result">
          Success, {tableResult.affectedRows} row(s) affected
        </div>
      );
    } else if (tableResult === null) {
      return <div className="nontable-result">Failure, check your syntax</div>;
    } else {
      return (
        <div className="nontable-result">
          I haven't implemented displaying this result yet
        </div>
      );
    }
  } else {
    return (
      <div className="nontable-result">
        Placeholder for when nothing has been executed
      </div>
    );
  }
}
