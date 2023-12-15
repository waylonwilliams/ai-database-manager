import "../App.css";
import { useState } from "react";

interface Props {
  SetMySQLLogin: (val: boolean) => void;
}

export default function Login({ SetMySQLLogin }: Props) {
  const [host, setHost] = useState("localhost");
  const [user, setUser] = useState("root");
  const [pass, setPass] = useState("hahahddd%55^jjd9");
  const [port, setPort] = useState("3306");
  const [toggle, setToggle] = useState(false); // left side (mysql)

  console.log(`second-image ${toggle ? "deselect" : ""}`);

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

  function changeImages() {
    if (toggle === false) {
      setToggle(true);
      // handle true toggle things here
    } else {
      setToggle(false);
      // handle false toggle thigns here
    }
  }

  return (
    <div className="container">
      <div className="login-div">
        <div
          className={toggle ? "toggle-container" : "toggle-container postgre"}
          onClick={changeImages}
        >
          <div className={`toggle-btn ${!toggle ? "left-select" : ""}`}></div>
          <div className="selection-container">
            <div className="image-container">
              <img src="../../files/mysql_deselect.png" />
              <img
                className={`${!toggle ? "deselect" : "selected"} second-image`}
                src="../../files/mysql_select.png"
              />
            </div>
            <div className="image-container">
              <img src="../../files/postgre_select.png" />
              <img
                className={`${!toggle ? "deselect" : "selected"} second-image`}
                src="../../files/postgre_deselect.png"
              />
            </div>
          </div>
        </div>
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
        <button className="db-connect-button" onClick={attemptLogin}>
          Connect
        </button>
      </div>
    </div>
  );
}
