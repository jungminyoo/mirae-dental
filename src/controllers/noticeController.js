export const notice = (req, res) => {
  return res.render("pages/notice", { pageTitle: "공지사항" });
};

export const cases = (req, res) => {
  return res.render("pages/cases", { pageTitle: "치료 전후 사례" });
};

export const caution = (req, res) => {
  return res.render("pages/caution", { pageTitle: "치료 후 주의사항" });
};

export const posting = (req, res) => {
  return res.render("pages/posting", { pageTitle: "게시글 제목 넣기" });
};

export const deletePosting = (req, res) => {
  return res.send("<h1>Delete</h1>");
};

export const getUploadPosting = (req, res) => {
  return res.render("pages/upload", { pageTitle: "게시글 작성" });
};

export const postUploadPosting = (req, res) => {
  console.log(req.body);
  return res.end();
};

export const getEditPosting = (req, res) => {
  return res.render("pages/edit", { pageTitle: "게시글 수정" });
};

export const postEditPosting = (req, res) => {
  return res.end();
};
