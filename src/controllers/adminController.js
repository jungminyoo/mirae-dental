import User from "../models/User";
import bcrypt from "bcrypt";

export const getRegister = (req, res) => {
  return res.render("pages/register", { pageTitle: "관리자 회원가입" });
};

export const postRegister = async (req, res) => {
  const { name, username, password, password_confirm, register_code } =
    req.body;
  const pageTitle = "관리자 회원가입";
  if (password !== password_confirm) {
    return res.status(400).render("pages/register", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const exists = await User.exists({ username });
  if (exists) {
    return res.status(400).render("pages/register", {
      pageTitle,
      errorMessage: "이미 존재하는 아이디입니다.",
    });
  }
  if (register_code !== process.env.REGISTER_CODE) {
    return res.status(400).render("pages/register", {
      pageTitle,
      errorMessage: "가입코드가 일치하지 않습니다.",
    });
  }
  try {
    await User.create({
      name,
      username,
      password,
    });
  } catch (error) {
    return res.status(400).render("pages/register", {
      pageTitle,
      errorMessage: error._message,
    });
  }
  return res.redirect("/admin/login");
};

export const getLogin = (req, res) => {
  return res.render("pages/login", { pageTitle: "관리자 로그인" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "관리자 로그인";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("pages/login", {
      pageTitle,
      errorMessage: "아이디가 일치하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("pages/login", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/notice");
};

export const getEditAdmin = (req, res) => {
  return res.render("pages/editProfile", { pageTitle: "관리자 회원정보 수정" });
};

export const postEditAdmin = (req, res) => {
  return res.end();
};
