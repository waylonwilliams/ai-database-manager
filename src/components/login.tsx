import "../App.css";

interface Props {
  SetMySQLLogin: (value: string) => void;
}

export default function Login({ SetMySQLLogin }: Props) {
  SetMySQLLogin(""); // accept user input and attempt to create an sql login? connect to db and such

  return (
    <div className="login-main">
      <h1>Connect to your database</h1>
      <label htmlFor="host">Host: </label>
      <input type="text" id="host" className="login-input1" /> <br />
      <label htmlFor="host">Username:</label>
      <input type="text" id="host" className="login-input2" /> <br />
      <label htmlFor="host">Password:</label>
      <input type="text" id="host" className="login-input3" /> <br />
      <button>Connect</button>
    </div>
  );
}
