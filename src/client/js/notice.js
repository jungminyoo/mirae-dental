const URLSearch = new URLSearchParams(location.search);

const handleLoad = (event) => {
  const whichBoard = URLSearch.get("whichBoard");
  if (whichBoard) {
    history.replaceState({}, null, location.pathname);
  }
};

window.addEventListener("load", handleLoad);
