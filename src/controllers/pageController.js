export const home = (req, res) => {
  return res.render("pages/home", { pageTitle: "홈" });
};

export const intro = (req, res) => {
  return res.render("pages/intro", { pageTitle: "병원소개" });
};

export const director = (req, res) => {
  return res.render("pages/director", { pageTitle: "원장소개" });
};

export const guide = (req, res) => {
  return res.render("pages/guide", { pageTitle: "진료안내" });
};

export const prosthetic = (req, res) => {
  return res.render("pages/prosthetic", { pageTitle: "심미보철" });
};

export const implant = (req, res) => {
  return res.render("pages/implant", { pageTitle: "임플란트" });
};

export const dentures = (req, res) => {
  return res.render("pages/dentures", { pageTitle: "틀니" });
};

export const endodontic = (req, res) => {
  return res.render("pages/endodontic", { pageTitle: "신경치료" });
};

export const periodental = (req, res) => {
  return res.render("pages/periodental", { pageTitle: "치주치료" });
};

export const cervical = (req, res) => {
  return res.render("pages/cervical", { pageTitle: "치경부마모" });
};

export const privacy = (req, res) => {
  return res.render("pages/privacy", { pageTitle: "개인정보처리방침" });
};

export const policy = (req, res) => {
  return res.render("pages/policy", { pageTitle: "이용약관" });
};
