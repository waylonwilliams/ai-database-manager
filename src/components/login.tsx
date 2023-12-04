import { useState } from "react";
import "../App.css";

interface Props {
  SetMySQLLogin: (value: string) => void;
}

export default function Login({ SetMySQLLogin }: Props) {
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  async function attemptLogin() {
    const result = await mysql.connectAPI.connect(host, user, pass);
    if (result != null) {
      console.log("Should set mysqllogin state");
      SetMySQLLogin(result);
    } else {
      console.log("returned null");
      // raise an incorrect login toast or sum
    }
  }

  return (
    <div className="login-main">
      <h1>Connect to your database</h1>
      Host:
      <input
        type="text"
        className="login-input1"
        value={host}
        onChange={(val) => {
          setHost(val.target.value);
        }}
      />{" "}
      <br />
      Username:
      <input
        type="text"
        className="login-input2"
        value={user}
        onChange={(val) => {
          setUser(val.target.value);
        }}
      />{" "}
      <br />
      Password:
      <input
        type="text"
        className="login-input3"
        value={pass}
        onChange={(val) => {
          setPass(val.target.value);
        }}
      />{" "}
      <br />
      <button onClick={attemptLogin}>Connect</button>
    </div>
  );
}
