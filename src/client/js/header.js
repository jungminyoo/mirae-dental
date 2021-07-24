const intro = document.getElementById("intro");
const introSub = document.getElementById("introSub");
const notice = document.getElementById("notice");
const noticeSub = document.getElementById("noticeSub");

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

intro.addEventListener("mouseover", handleIntroOver);
intro.addEventListener("mouseleave", handleIntroLeave);
introSub.addEventListener("mouseover", handleIntroOver);
introSub.addEventListener("mouseleave", handleIntroLeave);
notice.addEventListener("mouseover", handleNoticeOver);
notice.addEventListener("mouseleave", handleNoticeLeave);
noticeSub.addEventListener("mouseover", handleNoticeOver);
noticeSub.addEventListener("mouseleave", handleNoticeLeave);
