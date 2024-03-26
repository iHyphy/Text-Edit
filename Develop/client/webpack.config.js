const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: path.join(__dirname, 'src', 'js', 'index.js'),
      install: path.join(__dirname, 'src', 'js', 'install.js')
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'), // Corrected line
        title: 'Your Text Editor App',
      }),
      new InjectManifest({
        swSrc: path.join(__dirname, 'src-sw.js'),
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'Your Text Editor App',
        short_name: 'TextEditor',
        description: 'An awesome text editor!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve(__dirname, 'src', 'images', 'logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
