const contentContainer = document.getElementById("content");

const handleLoad = (event) => {
  const { content } = contentContainer.dataset;
  contentContainer.innerHTML = content;
};

window.addEventListener("load", handleLoad);
