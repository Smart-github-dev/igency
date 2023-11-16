const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js", // Specify the entry point for your ES6 script
  output: {
    path: path.resolve(__dirname, "./public/"), // Specify the output directory for the bundled script
    filename: "app.min.js", // Specify the name of the bundled script
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Use babel-loader for all .js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "dist",
        },
      ],
    }),
  ],
};
