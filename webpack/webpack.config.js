import { resolve as _resolve } from "path";
import { HotModuleReplacementPlugin, NamedModulesPlugin } from "webpack";

const config = {
  context: __dirname,
  entry: ["./js/App.jsx"],
  devtool:
    process.env.NODE_ENV === "development" ? "cheap-eval-source-map" : false,
  output: {
    path: _resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/",
  },
  devServer: {
    hot: true,
    publicPath: "/public/",
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
    },
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false,
  },
  plugins: [new HotModuleReplacementPlugin(), new NamedModulesPlugin()],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [_resolve("js"), _resolve("node_modules/preact-compat/src")],
      },
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  config.entry.unshift(
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
  );
}

export default config;
