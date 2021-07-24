export const getRegister = (req, res) => {
  return res.render("pages/register", { pageTitle: "관리자 회원가입" });
};

export const postRegister = (req, res) => {
  return res.end();
};

export const getLogin = (req, res) => {
  return res.render("pages/login", { pageTitle: "관리자 로그인" });
};

export const postLogin = (req, res) => {
  return res.end();
};

export const getEditAdmin = (req, res) => {
  return res.render("pages/editProfile", { pageTitle: "관리자 회원정보 수정" });
};

export const postEditAdmin = (req, res) => {
  return res.end();
};
