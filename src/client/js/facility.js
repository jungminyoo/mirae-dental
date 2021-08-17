const mainImage = document.querySelector(".facility-image > img");
const mainText = document.querySelector(".facility-image > h5");
const imgBtns = Array.prototype.slice.call(
  document.querySelectorAll(".img-button")
);

const handleImgClick = (event) => {
  const img = event.target.nextSibling;
  mainImage.src = img.src;
  mainImage.alt = img.alt;
  mainText.innerText = img.alt;
  imgBtns.map((imgBtn) => {
    if (imgBtn.classList.contains("img-selected")) {
      imgBtn.classList.remove("img-selected");
    }
  });
  event.target.classList.add("img-selected");
};

imgBtns.map((imgBtn) => imgBtn.addEventListener("click", handleImgClick));
