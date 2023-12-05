import { useState } from "react";
import "../App.css";

interface Props {
  SetMySQLLogin: (val: boolean) => void;
}

export default function Login({ SetMySQLLogin }: Props) {
  const [host, setHost] = useState("localhost");
  const [user, setUser] = useState("root");
  const [pass, setPass] = useState("hahahddd%55^jjd9");

  async function attemptLogin() {
    const result = await mysql.connectAPI.connect(host, user, pass);
    if (result != null) {
      // am I sure this is what returns on failure
      SetMySQLLogin(true);
    } else {
      console.log("connecting failed, try logging in again");
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
