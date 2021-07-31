import regeneratorRuntime, { async } from "regenerator-runtime";
import Quill from "quill";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["link", "image"],

  ["clean"], // remove formatting button
];

const options = {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: "snow",
  placeholder: "게시물을 작성하세요.",
};
const container = document.getElementById("editor");
const editor = new Quill(container, options);

editor.getModule("toolbar").addHandler("image", () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    if (input.files) {
      const formData = new FormData();
      formData.append("image", input.files[0], "image");
      const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
      const imgPath = response.headers.get("imgPath");
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", "/" + imgPath);
    }
  };
});

const submit = document.getElementById("submit");
const titleInput = document.getElementById("title");
const whichBoardInput = document.getElementById("whichBoard");
const isImportantInput = document.getElementById("isImportant");

const handleUpload = async (event) => {
  const uploadData = editor.getContents();
  const title = titleInput.value;
  const whichBoard = whichBoardInput.value;
  const isImportant = isImportantInput.checked;
  const { id } = submit.dataset;
  const fetchingURL = id ? `/notice/${id}/edit` : "/notice/upload";
  console.log(uploadData);
  alert();
  await fetch(fetchingURL, {
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

const handleLoad = (event) => {
  const contentContainer = document.getElementById("editor");
  let { content } = contentContainer.dataset;
  if (content) {
    content = JSON.parse(content);
    editor.setContents(content);
  }
};

window.addEventListener("load", handleLoad);
submit.addEventListener("click", handleUpload);
