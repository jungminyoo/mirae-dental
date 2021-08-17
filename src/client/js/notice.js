const URLSearch = new URLSearchParams(location.search);

const handleLoad = () => {
  const search = URLSearch.get("search");
  const value = URLSearch.get("value");
  if (!search || !value) {
    history.replaceState({}, null, location.pathname);
  }
};

window.addEventListener("load", handleLoad);
