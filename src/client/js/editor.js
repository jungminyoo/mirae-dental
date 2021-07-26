import regeneratorRuntime from "regenerator-runtime";
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
  alert(uploadData);
};

submit.addEventListener("click", handleUpload);
