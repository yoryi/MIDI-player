const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    concatenateModules: false,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "public/test.mid", to: "test.mid" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "public/test.mp3", to: "test.mp3" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "public/assets/image/stop.svg", to: "assets/image/stop.svg" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "public/assets/image/play icon.svg", to: "assets/image/play icon.svg" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "public/assets/image/metronome.svg", to: "assets/image/metronome.svg" }],
    }),
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "codingcafe_jp",
      project: "signal",
      release: process.env.VERCEL_GIT_COMMIT_SHA,
      include: "./dist",
      ignore: [
        "node_modules",
        "webpack.common.js",
        "webpack.dev.js",
        "webpack.prod.js",
      ],
      dryRun: process.env.VERCEL_ENV !== "production",
      debug: true,
      errorHandler: (err) => {
        console.warn("Sentry CLI Plugin: " + err.message);
      },
    }),
  ],
});
