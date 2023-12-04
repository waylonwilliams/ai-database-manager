import "./App.css";
import Workbench from "./components/workbench";
import Login from "./components/login";
import { useState } from "react";

export default function App() {
  const [MySQLLogin, SetMySQLLogin] = useState<string>(""); // the login should be a cursor like in python, should hold the logged in occurrance, and if not it is empty string or whatever it returns on failure
  return (
    <>
      {MySQLLogin === "" && <Login SetMySQLLogin={SetMySQLLogin} />}
      {MySQLLogin !== "" && <Workbench />}
    </>
  );
}
