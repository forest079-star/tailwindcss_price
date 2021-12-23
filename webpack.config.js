const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");   
const path = require('path');

module.exports = {
  target: 'web',
  // 入口
  entry: './src/index.js',
  // 模式 development
  mode: 'development',
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js',
  },
  // loader
  module: {
    rules: [{
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ],
      },
      {
        test: /\.gif/,
        type: 'asset/resource'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/index2.html',
      filename: 'index2.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.[hash].css'
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin()
  ],
  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    // HTML5 History API
    historyApiFallback: true, // Vue Router 會用到的功能
    port: 3600,
    hot: true, // 支援 css hot reload
    watchContentBase: true,
  },

  devtool: 'source-map'
}