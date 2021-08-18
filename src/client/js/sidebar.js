const inactive = document.querySelector(".inactive");
const sideBar = document.querySelector(".side-bar");
const sideBarExit = document.querySelector(".side-bar .side-bar__header i");
const sideBarLists = Array.prototype.slice.call(
  document.querySelectorAll(".side-bar__button > div")
);

let listBtn;

export const handleListClick = () => {
  sideBar.classList.remove("side-bar--hidden");
  sideBar.classList.add("side-bar--animation");
  setTimeout(() => {
    inactive.classList.remove("inactive");
    inactive.classList.add("inactive--showing");
  }, 300);
};

export const handleNavLoad = () => {
  listBtn = document.querySelector(".header__list");
  if (listBtn) {
    listBtn.addEventListener("click", handleListClick);
  }
};

const handleSideBarExit = () => {
  resetSideBarList();
  inactive.classList.add("inactive");
  inactive.classList.remove("inactive--showing");
  sideBar.classList.add("side-bar--hidden");
};

const resetSideBarList = () => {
  sideBarLists.map((sideBarList) => {
    if (
      sideBarList.parentElement.classList.contains("side-bar__button--showing")
    ) {
      sideBarList.parentElement.classList.remove("side-bar__button--showing");
    }
  });
};

const handleSideBarList = (event) => {
  resetSideBarList();
  event.target.parentElement.classList.add("side-bar__button--showing");
};

sideBarLists.map((sideBarList) => {
  sideBarList.addEventListener("click", handleSideBarList);
});

window.addEventListener("load", handleNavLoad);
inactive.addEventListener("click", handleSideBarExit);
sideBarExit.addEventListener("click", handleSideBarExit);
