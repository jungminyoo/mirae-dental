const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    header: "./src/client/js/header.js",
    editor: "./src/client/js/editor.js",
    posting: "./src/client/js/posting.js",
    notice: "./src/client/js/notice.js",
    banner: "./src/client/js/banner.js",
    map: "./src/client/js/map.js",
    facility: "./src/client/js/facility.js",
    sidebar: "./src/client/js/sidebar.js",
    //add more entry points here, name should be same as file name
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", //filename of css output
    }),
    new webpack.ProvidePlugin({
      "window.Quill": "quill",
    }),
    new dotenv(),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/quill-image-resize-module)/,
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
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "./img/",
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
};
