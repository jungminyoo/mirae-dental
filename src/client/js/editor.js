import regeneratorRuntime, { async } from "regenerator-runtime";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let editor;

ClassicEditor.create(document.querySelector("#editor"), {
  cloudServices: {
    tokenUrl:
      "https://82271.cke-cs.com/token/dev/42bd5091181ac7a6587d9ba339fc7b9c8b69ad21aba575e90b6ce3872e1a",
    uploadUrl: "https://82271.cke-cs.com/easyimage/upload/",
  },
})
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

const submit = document.getElementById("submit");
const titleInput = document.getElementById("title");
const whichBoardInput = document.getElementById("whichBoard");
const isImportantInput = document.getElementById("isImportant");

const handleUpload = async (event) => {
  const uploadData = editor.getData();
  const title = titleInput.value;
  const whichBoard = whichBoardInput.value;
  const isImportant = isImportantInput.value;
  await fetch("/notice/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      whichBoard,
      isImportant,
      content: uploadData,
    }),
  });
};

submit.addEventListener("click", handleUpload);
