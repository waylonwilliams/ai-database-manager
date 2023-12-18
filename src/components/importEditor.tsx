import Editor from "react-simple-code-editor";

interface Props {
  currentQuery: any;
  setCurrentQuery: (currentQuery: any) => void;
}

export default function HighlightEditor({
  currentQuery,
  setCurrentQuery,
}: Props) {
  return (
    <Editor
      value={currentQuery}
      onValueChange={(currentQuery) => setCurrentQuery(currentQuery)}
      highlight={(currentQuery) =>
        window.editor.hlight.makeHighlight(currentQuery)
      }
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
        border: "none",
        position: "relative",
      }}
      textareaClassName="field"
      placeholder="SELECT * FROM ..."
    />
  );
}
