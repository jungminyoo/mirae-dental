const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    header: "./src/client/js/header.js",
    editor: "./src/client/js/editor.js",
    posting: "./src/client/js/posting.js",
    //add more entry points here, name should be same as file name
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", //filename of css output
    }),
  ],
  mode: "development", //for development -> can changed into production
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
