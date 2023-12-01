import "../App.css";

interface Props {
  SetMySQLLogin: (value: string) => void;
}

export default function Login({ SetMySQLLogin }: Props) {
  // var mysql = require("mysql");
  SetMySQLLogin("");

  function attemptLogin() {
    //   var attemptedConnector = window.mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "hahahddd%55^jjd9",
    //   });
    //   attemptedConnector.connect(function (err: Error) {
    //     if (err) {
    //       console.error("Error connecting to MySQL: " + err.stack);
    //       return; // say incorrect login somewhere
    //     }
    //     console.log("Connected to MySQL as id " + attemptedConnector.threadId);
    //     SetMySQLLogin(attemptedConnector); // should now route to home page
    //   });
  }

  return (
    <div className="login-main">
      <h1>Connect to your database</h1>
      <label htmlFor="host">Host: </label>
      <input type="text" id="host" className="login-input1" /> <br />
      <label htmlFor="host">Username:</label>
      <input type="text" id="host" className="login-input2" /> <br />
      <label htmlFor="host">Password:</label>
      <input type="text" id="host" className="login-input3" /> <br />
      <button onClick={attemptLogin}>Connect</button>
    </div>
  );
}
