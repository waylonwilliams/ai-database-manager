import "../App.css";
import { useEffect, useState } from "react";

interface Props {
  SetMySQLLogin: (val: boolean) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
}

export default function Login({ SetMySQLLogin, loading, setLoading }: Props) {
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [port, setPort] = useState("");
  // const [toggle, setToggle] = useState(false); // left side (mysql)
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    async function reconnect() {
      if (!loading) {
        return;
      }
      console.log("Still getting from local storage");
      const storedHost = localStorage.getItem("host");
      const storedUser = localStorage.getItem("user");
      const storedPass = localStorage.getItem("pass");
      const storedPort = localStorage.getItem("port");
      if (
        storedHost === null ||
        storedPass === null ||
        storedPort === null ||
        storedUser === null
      ) {
        console.log(
          "Something in local storage was null so its not loading properly"
        );
        setLoading(false);
        return;
      }
      const result = await window.mysql.connectAPI.connect(
        storedHost,
        storedUser,
        storedPass,
        Number(storedPort)
      );
      if (result != null) {
        SetMySQLLogin(true);
      } else {
        setLoading(false);
      }
    }
    reconnect();
  }, []);

  async function attemptLogin() {
    localStorage.setItem("host", host);
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    localStorage.setItem("port", port);

    const result = await window.mysql.connectAPI.connect(
      host,
      user,
      pass,
      Number(port)
    );
    if (result != null) {
      SetMySQLLogin(true);
    } else {
      console.log("connecting failed, try logging in again");
      setFailed(true);
    }
  }

  // function changeImages() {
  //   if (toggle === false) {
  //     setToggle(true);
  //     // handle true toggle things here
  //   } else {
  //     setToggle(false);
  //     // handle false toggle thigns here
  //   }
  // }

  if (loading) {
    return <></>;
  }
  return (
    <div className="container">
      <div className="login-title">MySQL Manager</div>
      <div className="login-div">
        {/* 
        IMAGE TOGGLE SWITCH
        <div
          className={toggle ? "toggle-container" : "toggle-container postgre"}
          onClick={changeImages}
        >
          <div className={`toggle-btn ${!toggle ? "left-select" : ""}`}></div>
          <div className="selection-container">
            <div className="image-container">
              <img src="./static/images/mysql_deselect.png" />
              <img
                className={`${!toggle ? "deselect" : "selected"} second-image`}
                src="./static/images/mysql_select.png"
              />
            </div>
            <div className="image-container">
              <img src="./static/images/postgre_select.png" />
              <img
                className={`${!toggle ? "deselect" : "selected"} second-image`}
                src="./static/images/postgre_deselect.png"
              />
            </div>
          </div>
        </div> */}
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
        {failed && (
          <div className="failed-login">Connection failed, try again</div>
        )}
        <button className="db-connect-button" onClick={attemptLogin}>
          Connect
        </button>
      </div>
    </div>
  );
}
