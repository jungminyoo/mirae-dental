import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import regeneratorRuntime, { async } from "regenerator-runtime";

const contentContainer = document.getElementById("content");
const deletePosting = document.getElementById("delete");

const handleLoad = async (event) => {
  let { content, id } = contentContainer.dataset;
  content = JSON.parse(content);
  const converter = new QuillDeltaToHtmlConverter(content.ops);
  content = converter.convert();
  contentContainer.innerHTML = content;
  await fetch(`/api/${id}/views`, { method: "POST" });
};

const handleDelete = (event) => {
  const result = window.confirm("게시물을 삭제하시겠습니까?");
  const { id } = contentContainer.dataset;
  if (result) {
    window.location.replace(`/notice/${id}/delete`);
  }
};

window.addEventListener("load", handleLoad);
deletePosting.addEventListener("click", handleDelete);
