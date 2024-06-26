const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 3100,
  },
  output: {
    publicPath: "http://localhost:3100/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remoteapp",
      library: { type: "var", name: "remoteapp" },
      filename: "remoteEntry.js",
      exposes: {
        './Button': "./src/Button",
      },
      shared: {
        // ...deps,
        react: {
             eager: true,
            // singleton: true,
            requiredVersion: '17.0.2',
        },
        "react-dom": {
          eager: true,
          // singleton: true,
          requiredVersion: '17.0.2',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};