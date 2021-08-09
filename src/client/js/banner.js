const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const imgBanner = document.querySelector(".img-banner");
const images = document.querySelectorAll(".img-banner li");

let current = 0;
const imgLength = images.length;

const handleLoad = (event) => {
  const widthPer = 100 * imgLength;
  imgBanner.style.width = `${widthPer}%`;
};

const handleLeftBtn = () => {
  current = (current - 1) % imgLength;
  current = current < 0 ? imgLength + current : current;
  const translatePer = (current / imgLength) * 100 * -1;
  imgBanner.style.transform = `translate(${translatePer}%)`;
};

const handleRightBtn = () => {
  current = (current + 1) % imgLength;
  current = current < 0 ? imgLength + current : current;
  const translatePer = (current / imgLength) * 100 * -1;
  imgBanner.style.transform = `translate(${translatePer}%)`;
};

setInterval(handleRightBtn, 5000);

leftButton.addEventListener("click", handleLeftBtn);
rightButton.addEventListener("click", handleRightBtn);
window.addEventListener("DOMContentLoaded", handleLoad);
