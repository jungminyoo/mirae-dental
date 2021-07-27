import regeneratorRuntime, { async } from "regenerator-runtime";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let editor;

ClassicEditor.create(document.querySelector("#editor"))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

const submit = document.getElementById("submit");

const handleUpload = async (event) => {
  const uploadData = editor.getData();
  console.log(JSON.stringify({ content: uploadData }));
  const res = await fetch("/notice/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: uploadData }),
  });
  console.log(res);
};

submit.addEventListener("click", handleUpload);
