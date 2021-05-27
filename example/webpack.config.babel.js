require('@babel/register');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bootstrap: ['@babel/polyfill', './example/bootstrap.js'],
  },
  devtool: 'source-map',
  devServer: {
    publicPath: '/',
    contentBase: './example',
    proxy: {
      '**': 'http://localhost:8081',
    },
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: __dirname + '/public',
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
    <head>
      <style>
        .wrapper {
          position: relative;
        }

        .wrapper > div {
          position: absolute;
          width: 100%;
        }
        .alert-enter {
          opacity: 0.01;
        }
        .alert-enter-active {
          opacity: 1;
          transition: opacity 500ms ease-in;
        }
        .alert-exit {
          opacity: 1;
        }
        .alert-exit-active {
          opacity: 0.01;
          transition: opacity 300ms ease-in;
        }
      </style>
    </head>
    <body>
      <div id="app"></div>
    </body>
    `,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7'],
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-proposal-object-rest-spread',
              {
                useBuiltIns: true,
              },
            ],
            'transform-es2015-modules-umd',
          ],
        },
      },
    ],
  },
};
