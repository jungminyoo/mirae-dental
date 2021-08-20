import regeneratorRuntime, { async } from "regenerator-runtime";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";

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

Quill.register("modules/ImageResize", ImageResize);
const options = {
  modules: {
    toolbar: toolbarOptions,
    ImageResize: {
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
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
      const isHeroku = response.headers.get("isHeroku") === "true";
      const range = editor.getSelection();
      const realPath = isHeroku ? imgPath : "/" + imgPath;
      editor.insertEmbed(range.index, "image", realPath);
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
  if (!title) {
    alert("제목을 작성해주세요.");
    return titleInput.focus({ preventScroll: false });
  }
  const { id } = submit.dataset;
  const fetchingURL = id ? `/notice/${id}/edit` : "/notice/upload";
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
  let backPage;
  if (whichBoard === "치료 전후 사례") {
    backPage = "/cases/";
  } else if (whichBoard === "치료 후 주의사항") {
    backPage = "/caution/";
  } else {
    backPage = "/";
  }
  if (id) {
    window.location.replace(`/notice${backPage}${id}`);
  } else {
    window.location.replace(`/notice${backPage}1`);
  }
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
