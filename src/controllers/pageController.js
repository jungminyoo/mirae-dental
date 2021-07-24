export const home = (req, res) => {
  return res.render("pages/home", { pageTitle: "홈" });
};

export const intro = (req, res) => {
  return res.send("<h1>Intro</h1>");
};

export const director = (req, res) => {
  return res.send("<h1>Director</h1>");
};

export const guide = (req, res) => {
  return res.send("<h1>Guide</h1>");
};

export const prosthetic = (req, res) => {
  return res.send("<h1>Prosthetic</h1>");
};

export const implant = (req, res) => {
  return res.send("<h1>Implant</h1>");
};

export const dentures = (req, res) => {
  return res.send("<h1>Dentures</h1>");
};

export const endodontic = (req, res) => {
  return res.send("<h1>Endodontic</h1>");
};

export const others = (req, res) => {
  return res.send("<h1>Others</h1>");
};
