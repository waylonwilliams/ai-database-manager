import "./App.css";
import Workbench from "./components/workbench";
import Login from "./components/login";
import NewLogin from "./components/newlogin";
import { useState } from "react";

export default function App() {
  const [MySQLLogin, SetMySQLLogin] = useState<boolean>(false); // how to type this?
  // {MySQLLogin === false && <Login SetMySQLLogin={SetMySQLLogin} />}
  return (
    <>
      {MySQLLogin === false && <NewLogin />}
      {MySQLLogin === true && <Workbench SetMySQLLogin={SetMySQLLogin} />}
    </>
  );
}
