import "../App.css";
import { useState } from "react";
import Parser from "html-react-parser";

export default function NewEditor() {
  const [format, setFormat] = useState<string>("");
  const [formatLength, setFormatLength] = useState<number>(0);

  var keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "LIKE",
    "BETWEEN",
    "NOT LIKE",
    "FALSE",
    "NULL",
    "FROM",
    "TRUE",
    "NOT IN",
  ];

  // this does not account for not trailing insertion / deletion

  // if insertion (compare lengths, maybe a serparte state variable for length)
  //    if new character is space
  //        check if word in between this space and previous is a keyword
  //        ..
  // else (deletion)
  //    if end of state string is "</span>"
  //        isolate span text content, take off a character, put it back in format
  // reset cursor to back
  // maybe set focus back to text editor

  function newLetter(e: any) {
    console.log(e.target.textContent);
    const l = e.target.textContent.length;
    if (l > format.length) {
      console.log("Insertion");
      if (e.target.textContent.charAt(formatLength + 1) == " ") {
        // if space
        console.log("Space");
      }
    } else {
      // deletion
      console.log("Deletion");
    }
    setFormat(e.target.textContent);
  }

  return (
    <div
      className="editor"
      contentEditable="true"
      placeholder="Query your database here"
      onInput={newLetter}
      suppressContentEditableWarning
    >
      {Parser(format)}
    </div>
  );
}
