import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import regeneratorRuntime, { async } from "regenerator-runtime";

const contentContainer = document.getElementById("content");

const handleLoad = async (event) => {
  let { content, id } = contentContainer.dataset;
  content = JSON.parse(content);
  const converter = new QuillDeltaToHtmlConverter(content.ops);
  content = converter.convert();
  contentContainer.innerHTML = content;
  await fetch(`/api/${id}/views`, { method: "POST" });
};

window.addEventListener("load", handleLoad);
