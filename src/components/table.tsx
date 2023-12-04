import "../App.css";

interface Props {
  tableResult: any;
}

export default function Table({ tableResult }: Props) {
  if (Array.isArray(tableResult)) {
    for (let element of tableResult) {
      console.log(element);
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
  }

  return (
    <table className="simple-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Meow</th>
        </tr>
      </thead>
      <tbody>{}</tbody>
    </table>
  );
}
