import { useState } from "react";
import "../App.css";

interface Props {
  SetMySQLLogin: (val: boolean) => void;
}

export default function Login({ SetMySQLLogin }: Props) {
  const [host, setHost] = useState("localhost");
  const [user, setUser] = useState("root");
  const [pass, setPass] = useState("hahahddd%55^jjd9");
  const [port, setPort] = useState("3306");

  async function attemptLogin() {
    const result = await mysql.connectAPI.connect(
      host,
      user,
      pass,
      Number(port)
    );
    if (result != null) {
      SetMySQLLogin(true);
    } else {
      console.log("connecting failed, try logging in again");
      // raise some kind of toast here
    }
  }

  return (
    <div className="login-main">
      <h1 className="login-header">Connect to your database</h1>
      <input
        type="text"
        className="login-field"
        value={host}
        onChange={(val) => {
          setHost(val.target.value);
        }}
        placeholder="Host"
      />{" "}
      <br />
      <input
        type="text"
        className="login-field"
        value={user}
        onChange={(val) => {
          setUser(val.target.value);
        }}
        placeholder="Username"
      />{" "}
      <br />
      <input
        type="text"
        className="login-field"
        value={pass}
        onChange={(val) => {
          setPass(val.target.value);
        }}
        placeholder="Password (leave blank if none)"
      />{" "}
      <br />
      <input
        type="text"
        className="login-field"
        value={port}
        onChange={(val) => {
          setPort(val.target.value);
        }}
        placeholder="Port (3306 is default for localhost)"
      />{" "}
      <br />
      <button className="login-button" onClick={attemptLogin}>
        Connect
      </button>
    </div>
  );
}
