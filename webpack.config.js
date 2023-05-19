const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './scripts/index.js',
    personalAcc: './scripts/personalAcc.js',
    passwordChange: './scripts/passwordChange.js',
    helpPage: './scripts/helpPage.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8082
  },
  module: {

    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'personalAccount.html',
      template: './personalAccount.html',
      chunks: ['personalAcc']
    }),
    new HtmlWebpackPlugin({
      filename: 'passwordChange.html',
      template: './passwordChange.html',
      chunks: ['passwordChange']
    }),
    new HtmlWebpackPlugin({
      filename: 'helpPage.html',
      template: './helpPage.html',
      chunks: ['helpPage']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
  ]
}