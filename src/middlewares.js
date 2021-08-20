import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const page404Middleware = (req, res) => {
  return res.status(404).render("pages/404", {
    pageTitle: "404 Not Found",
    errorMessage: "404 Not Found",
  });
};

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  return next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "관리자가 아닙니다.");
    return res.redirect("/admin/login");
  }
};

export const publicOnlyMiddleWare = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "이미 로그인 되어 있습니다.");
    return res.redirect("/");
  }
};

const multerUploader = multers3({
  s3: s3,
  bucket: "mirae-dental",
  acl: "public-read",
});

export const uploadImage = multer({
  dest: "uploads/img",
  storage: multerUploader,
});
