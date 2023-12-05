import "./App.css";
import Workbench from "./components/workbench";
import Login from "./components/login";
import { useState } from "react";

export default function App() {
  const [MySQLLogin, SetMySQLLogin] = useState<boolean>(false); // how to type this?
  return (
    <>
      {MySQLLogin === false && <Login SetMySQLLogin={SetMySQLLogin} />}
      {MySQLLogin === true && <Workbench SetMySQLLogin={SetMySQLLogin} />}
    </>
  );
}
