import "./App.css";
import Table from "./components/table";
import Selector from "./components/file";

export default function App() {
  return (
    <div className="row">
      <div className="column left">
        <textarea className="field" />
        <Table />
      </div>
      <div className="column right">
        <Selector />
      </div>
    </div>
  );
}
