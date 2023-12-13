import "../App.css";
import { useState } from "react";

interface Props {
  SetMySQLLogin: (val: boolean) => void;
}

export default function NewLogin({ SetMySQLLogin }: Props) {
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
    <div className="container">
      <div className="login-div">
        <label className="toggle-db">
          <input type="checkbox"></input>
          <span className="slider"></span>
        </label>
        <button className="db-selector-button">Yooo</button>
        <br />
        <input
          type="text"
          className="new-login-field"
          value={host}
          onChange={(val) => {
            setHost(val.target.value);
          }}
          placeholder="Host"
        />{" "}
        <br />
        <input
          type="text"
          className="new-login-field"
          value={user}
          onChange={(val) => {
            setUser(val.target.value);
          }}
          placeholder="Username"
        />{" "}
        <br />
        <input
          type="text"
          className="new-login-field"
          value={pass}
          onChange={(val) => {
            setPass(val.target.value);
          }}
          placeholder="Password (leave blank if none)"
        />{" "}
        <br />
        <input
          type="text"
          className="new-login-field"
          value={port}
          onChange={(val) => {
            setPort(val.target.value);
          }}
          placeholder="Port (3306 is default for localhost)"
        />{" "}
        <br />
        <button className="db-connect-button">Connect</button>
      </div>
    </div>
  );
}
