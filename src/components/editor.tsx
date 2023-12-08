import "../App.css";
import NewEditor from "./neweditor";

interface Props {
  currentQuery: any;
  setCurrentQuery: (val: any) => void;
}

export default function Editor({ currentQuery, setCurrentQuery }: Props) {
  return (
    <>
      <NewEditor />
      <textarea
        className="field"
        value={currentQuery}
        onChange={(val) => {
          setCurrentQuery(val.target.value);
        }}
        placeholder="Query your database here"
      />
    </>
  );
}
