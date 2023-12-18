const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const isDevelopment = options.mode === "development";

  return {
    mode: isDevelopment ? "development" : "production",
    entry: {
      SharePlace: "./src/SharePlace.js",
      MyPlace: "./src/MyPlace.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist", "assets", "scripts"),
      publicPath: "/assets/scripts/",
    },
    devtool: isDevelopment ? "eval-cheap-module-source-map" : "source-map",
    // devServer: {
    //   contentBase: "./dist",
    // },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  { useBuiltIns: "usage", corejs: { version: 3 } },
                ],
              ],
            },
          },
        },
      ],
    },
  };
};

// const path = require('path');
// const CleanPlugin = require('clean-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   entry: {
//     'SharePlace': './src/SharePlace.js',
//     'MyPlace': './src/MyPlace.js',
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
//     publicPath: 'assets/scripts/'
//   },
//   devtool: 'eval-cheap-module-source-map',
//   devServer: {
//     contentBase: './dist'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               [
//                 '@babel/preset-env',
//                 { useBuiltIns: 'usage', corejs: { version: 3 } }
//               ]
//             ]
//           }
//         }
//       }
//     ]
//   },
//   plugins: [new CleanPlugin.CleanWebpackPlugin()]
// };
