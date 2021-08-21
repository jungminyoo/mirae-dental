import { handleListClick, handleNavLoad } from "./sidebar";

const nav = document.querySelector(".header");
const header = document.querySelector("header");
const intro = document.getElementById("intro");
const introSub = document.getElementById("introSub");
const notice = document.getElementById("notice");
const noticeSub = document.getElementById("noticeSub");
const main = document.querySelector("main");

let tempTel;
let tempContents;
let tempList;

const handleIntroOver = () => {
  introSub.classList.remove("hidden");
};

const handleIntroLeave = () => {
  introSub.classList.add("hidden");
};

const handleNoticeOver = () => {
  noticeSub.classList.remove("hidden");
};

const handleNoticeLeave = () => {
  noticeSub.classList.add("hidden");
};

const handleResize = () => {
  const width = window.innerWidth;
  const tel = document.querySelector(".header__tel");
  const list = document.querySelector(".header__list");
  const headerContents = document.querySelector(".header__contents");

  if (width > 1060) {
    // Add
    if (!headerContents) {
      nav.appendChild(tempContents);
    }
    if (!tel) {
      nav.appendChild(tempTel);
    }
    // Remove
    if (list) {
      tempList = list;
      list.remove();
    }
    if (nav.classList.contains("nav--M")) {
      nav.classList.remove("nav--M");
    }
    if (main.classList.contains("main--M")) {
      main.classList.remove("main--M");
    }
    if (header.classList.contains("header--S")) {
      header.classList.remove("header--S");
    }
    if (nav.classList.contains("nav--S")) {
      nav.classList.remove("nav--S");
    }
    if (main.classList.contains("main--S")) {
      main.classList.remove("main--S");
    }
  } else if (width <= 1060 && width > 768) {
    // Add
    if (!headerContents) {
      nav.appendChild(tempContents);
    }
    if (!nav.classList.contains("nav--M")) {
      nav.classList.add("nav--M");
    }
    if (!main.classList.contains("main--M")) {
      main.classList.add("main--M");
    }
    // Remove
    if (tel) {
      tempTel = tel;
      tel.remove();
    }
    if (list) {
      tempList = list;
      list.remove();
    }
    if (header.classList.contains("header--S")) {
      header.classList.remove("header--S");
    }
    if (nav.classList.contains("nav--S")) {
      nav.classList.remove("nav--S");
    }
    if (main.classList.contains("main--S")) {
      main.classList.remove("main--S");
    }
  } else {
    // Add
    if (!list) {
      const newList = document.createElement("i");
      newList.className = "fas fa-bars header__list";
      nav.appendChild(newList);
      handleNavLoad();
    }
    if (!nav.classList.contains("nav--S")) {
      nav.classList.add("nav--S");
    }
    if (!header.classList.contains("header--S")) {
      header.classList.add("header--S");
    }
    if (!main.classList.contains("main--S")) {
      main.classList.add("main--S");
    }
    // Remove
    if (tel) {
      tempTel = tel;
      tel.remove();
    }
    if (headerContents) {
      tempContents = headerContents;
      headerContents.remove();
    }
    if (nav.classList.contains("nav--M")) {
      nav.classList.remove("nav--M");
    }
    if (main.classList.contains("main--M")) {
      main.classList.remove("main--M");
    }
  }
};

const handleHeaderLoad = () => {
  handleResize();
};

intro.addEventListener("mouseover", handleIntroOver);
intro.addEventListener("mouseleave", handleIntroLeave);
introSub.addEventListener("mouseover", handleIntroOver);
introSub.addEventListener("mouseleave", handleIntroLeave);
notice.addEventListener("mouseover", handleNoticeOver);
notice.addEventListener("mouseleave", handleNoticeLeave);
noticeSub.addEventListener("mouseover", handleNoticeOver);
noticeSub.addEventListener("mouseleave", handleNoticeLeave);
window.addEventListener("resize", handleResize);
window.addEventListener("DOMContentLoaded", handleHeaderLoad);
