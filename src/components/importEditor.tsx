import React from "react";
import Editor from "react-simple-code-editor";

interface Props {
  currentQuery: any;
  setCurrentQuery: () => void;
}

export default function HighlightEditor({
  currentQuery,
  setCurrentQuery,
}: Props) {
  const [code, setCode] = React.useState(`select * from x where x = 5`);
  return (
    <Editor
      value={code}
      onValueChange={(code) => {setCode(code); }
      highlight={(code) => editor.hlight.makeHighlight(code)}
      padding={2}
      style={{
        width: "97%",
        marginLeft: "10px",
        height: "30vh",
        backgroundColor: "#eeeeee",
        color: "#000000",
        resize: "none",
        fontFamily: "monospace",
        fontSize: "14px",
        outline: "none",
        border: "none",
        position: "relative",
      }}
      placeholder="SELECT * FROM ..."
    />
  );
}
