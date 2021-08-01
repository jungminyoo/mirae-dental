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
      errorMessage: "관리자 가입 도중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
  req.flash("notice", "정상적으로 가입되었습니다. 로그인해 주세요.");
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
      errorMessage: "존재하지 않는 아이디입니다.",
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
  req.flash("notice", `반갑습니다 ${user.name}님!`);
  return res.redirect("/");
};

export const getEditAdmin = (req, res) => {
  const { user } = req.session;
  return res.render("pages/editProfile", {
    pageTitle: "관리자 회원정보 수정",
    user,
  });
};

export const postEditAdmin = async (req, res) => {
  const { name, username } = req.body;
  const {
    user: { _id },
  } = req.session;
  const sessionName = req.session.user.name;
  const sessionUsername = req.session.user.username;
  if (sessionName !== name) {
    const existsName = await User.exists({ name });
    if (existsName) {
      return res.status(400).render("pages/editProfile", {
        pageTitle: "관리자 회원정보 수정",
        errorMessage: "이미 존재하는 이름입니다.",
      });
    }
  }
  if (sessionUsername !== username) {
    const existsUsername = await User.exists({ username });
    if (existsUsername) {
      return res.status(400).render("pages/editProfile", {
        pageTitle: "관리자 회원정보 수정",
        errorMessage: "이미 존재하는 아이디입니다.",
      });
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        username,
      },
      { new: true }
    );
    req.session.user = updatedUser;
    req.flash("notice", "관리자 회원정보가 정상적으로 수정되었습니다.");
    return res.redirect("/admin/edit");
  } catch (error) {
    return res.render("pages/editProfile", {
      pageTitle: "관리자 회원정보 수정",
      errorMessage:
        "관리자 회원정보 수정 도중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
};

export const getEditPassword = (req, res) => {
  return res.render("pages/editPassword", {
    pageTitle: "관리자 비밀번호 변경",
  });
};

export const postEditPassword = async (req, res) => {
  const { old_password, new_password, new_password_confirm } = req.body;
  const {
    user: { _id },
  } = req.session;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(old_password, user.password);
  if (!ok) {
    return res.status(400).render("pages/editPassword", {
      pageTitle: "관리자 비밀번호 변경",
      errorMessage: "이전 비밀번호가 일치하지 않습니다.",
    });
  }
  if (new_password !== new_password_confirm) {
    return res.status(400).render("pages/editPassword", {
      pageTitle: "관리자 비밀번호 변경",
      errorMessage: "비밀번호가 서로 일치하지 않습니다.",
    });
  }
  const isNew = await bcrypt.compare(new_password, user.password);
  if (isNew) {
    return res.status(400).render("pages/editPassword", {
      pageTitle: "관리자 비밀번호 변경",
      errorMessage: "기존 비밀번호와 일치합니다.",
    });
  }
  try {
    user.password = new_password;
    user.save();
    req.session.user.password = user.password;
    req.flash("notice", "관리자 비밀번호가 정상적으로 변경되었습니다.");
    return res.redirect("/admin/edit");
  } catch (error) {
    return res.render("pages/editPassword", {
      pageTitle: "관리자 비밀번호 변경",
      errorMessage:
        "관리자 비밀번호 변경 도중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
};

export const logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    req.session.loggedIn = false;
    req.flash("notice", "정상적으로 로그아웃 되었습니다.");
    return res.redirect("/");
  } else {
    return res.redirect("/");
  }
};
