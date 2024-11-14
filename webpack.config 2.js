const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // CSS loader
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader', // Font files loader
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'], // SVG loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true, // This line is crucial for React Router to work with Webpack Dev Server
    compress: true,
    port: 3000,
    hot: true,
  },
};

