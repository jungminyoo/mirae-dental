import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const contentContainer = document.getElementById("content");

const handleLoad = (event) => {
  let { content } = contentContainer.dataset;
  content = JSON.parse(content);
  const converter = new QuillDeltaToHtmlConverter(content.ops);
  content = converter.convert();
  contentContainer.innerHTML = content;
};

window.addEventListener("load", handleLoad);
