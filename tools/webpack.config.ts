import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlguin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import DotenvWebpack from "dotenv-webpack";

import * as paths from "./paths.config";
const isDev = process.argv.includes("--dev");
const isProd = process.argv.includes("--prod");

module.exports = {
  mode: isDev ? "development" : "production",

  entry: ["./src/core/polyfills", "./src/entries/index.tsx"],

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? "[name].js" : "[name].[chunkhash:8].js",
    chunkFilename: isDev
      ? "chunks/[name].js"
      : "chunks/[name].[chunkhash:8].js",
    publicPath: isProd ? paths.PUBLIC_URL : ""
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "~": paths.SRC_DIR
    }
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          // tsc编译后，再用babel处理
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              // 加快编译速度
              transpileOnly: true,
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, "../tsconfig.json")
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(css|less|sass|scss)$/,
        rules: [
          {
            loader: isDev ? "style-loader" : MiniCssExtractPlguin.loader
          },
          {
            exclude: paths.SRC_DIR,
            loader: "css-loader",
            options: {
              sourceMap: isDev
            }
          },

          {
            include: paths.SRC_DIR,
            loader: "css-loader",
            options: {
              sourceMap: isDev,
              modules: true
            }
          },

          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")({})]
            }
          },

          {
            test: /\.(scss|sass)$/,
            loader: "sass-loader",
            options: {
              data: '@import "style/variables.scss";',
              sourceMap: isDev,
              includePaths: [paths.SRC_DIR]
            }
          }
        ]
      },

      {
        test: /\.(png|jpg|jpeg|gif|ico|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          name: "assets/[hash:8].[ext]",
          limit: 8196
        }
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[hash].[ext]"
        }
      },

      {
        test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
        loader: "file-loader",
        options: {
          name: "media/[hash].[ext]"
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/entries/index.html",
      // 使用的是该插件内部集成的HTMLMinifier
      minify: {
        // 是对html文件进行压缩
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true // 去掉属性的双引号
      },
      hash: true, // 为了开发中js有缓存效果，所以加入hash,这样可以有效避免缓存js
      favicon: "./src/entries/favicon.ico"
    }),

    new MiniCssExtractPlguin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css"
    }),

    new DotenvWebpack({
      path: `./.env.${isDev ? "dev" : isProd ? "prod" : "uat"}`
    })
  ],

  optimization: {
    runtimeChunk: true, // 抽离webpack的runtime代码
    // 指定需要进行分块的代码，和分块后文件名
    splitChunks: {
      chunks: "all", // 异步、非异步均纳入抽离范围
      minSize: 0, // 抽离包大小下限不做限制，30k以下的也抽离
      maxSize: 80000, // 抽离包大小上限，抽离后大小若超过上限，且包含多个可再拆分的模块时，会再次拆分，保证单个文件不会过大
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },

    minimizer: [
      new UglifyJsPlugin({
        // 使用文件缓存，当js文件没有变化时候就利用缓存
        cache: true,
        // 采用多线程来加速压缩
        parallel: true,
        sourceMap: true
      }),

      new OptimizeCSSAssetsPlugin()
    ]
  },

  devServer: {
    port: 8088,
    host: "localhost",
    publicPath: "/",
    contentBase: "./src",
    historyApiFallback: true,
    open: false,
    proxy: {
      "/wechatBH": {
        target: "http://wx-test.by-health.com/",
        changeOrigin: true
      },
      "/scrm": {
        target: "http://wx-test1.by-health.com/",
        changeOrigin: true
      }
    }
  }
};
