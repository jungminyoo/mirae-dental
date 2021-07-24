export const notice = (req, res) => {
  return res.send("<h1>Notice</h1>");
};

export const cases = (req, res) => {
  return res.send("<h1>Cases</h1>");
};

export const caution = (req, res) => {
  return res.send("<h1>Caution</h1>");
};

export const posting = (req, res) => {
  return res.send("<h1>Posting</h1>");
};

export const deletePosting = (req, res) => {
  return res.send("<h1>Delete</h1>");
};

export const getUploadPosting = (req, res) => {
  return res.send("<h1>Upload</h1>");
};

export const postUploadPosting = (req, res) => {
  return res.end();
};

export const getEditPosting = (req, res) => {
  return res.send("<h1>Upload</h1>");
};

export const postEditPosting = (req, res) => {
  return res.end();
};
