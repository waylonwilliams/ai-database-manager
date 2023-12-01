import "./App.css";
import Workbench from "./components/workbench";
import Login from "./components/login";
import { useState } from "react";

export default function App() {
  const [MySQLLogin, SetMySQLLogin] = useState<string>("a");
  return (
    <>
      {MySQLLogin === "" && <Login SetMySQLLogin={SetMySQLLogin} />}
      {MySQLLogin !== "" && <Workbench />}
    </>
  );
}
