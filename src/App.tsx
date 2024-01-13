import "./App.css";
import Workbench from "./components/workbench";
import Login from "./components/login";
import { useState } from "react";

export default function App() {
  const [MySQLLogin, SetMySQLLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <>
      HERE?
      {MySQLLogin === false && (
        <Login
          SetMySQLLogin={SetMySQLLogin}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {MySQLLogin === true && (
        <Workbench SetMySQLLogin={SetMySQLLogin} setLoading={setLoading} />
      )}
    </>
  );
}
