const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
  },
  devServer: {
    host: SERVER_HOSTNAME,
    port: SERVER_PORT,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        GA_ID: JSON.stringify(process.env.GA_ID),
        SPOTIFY_CALLBACK_URI: JSON.stringify(process.env.SPOTIFY_CALLBACK_URI),
        SPOTIFY_CLIENT_ID: JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
        SPOTIFY_SCOPES: JSON.stringify(process.env.SPOTIFY_SCOPES),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Audio Insights | 603.nz',
      template: path.join(__dirname, 'src', 'index.ejs'),
      meta: {
        description: 'Data tings derived from your Spotify library',
      },
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 20,
        },
        utilities: {
          test: /[\\/]node_modules[\\/](immutable|moment|react|react-dom|react-loading)[\\/]/,
          name: 'utilities',
          priority: 30,
        },
        common: {
          name: 'async-common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      rebass: path.join(__dirname, 'src', 'shared-components', 'rebassCompat.js'),
      reflexbox: path.join(__dirname, 'src', 'shared-components', 'reflexboxCompat.js'),
      'react-geomicons': path.join(__dirname, 'src', 'shared-components', 'geomiconsCompat.js'),
    },
    extensions: ['.js', '.jsx', '.css', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                namedExport: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
