export default function Table() {
  const data = [
    // generate this dynamically every time button from text input is pressed
    { id: 1, name: "John Doe", age: 25, meow: "999" },
    { id: 2, name: "Jane Doe", age: 30, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
    { id: 3, name: "Bob Smith", age: 28, meow: "999" },
  ];

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
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.meow}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
