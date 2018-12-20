const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '',
      filename: 'static/js/[name].[hash].js'
    },

    //mode: "development",
    devtool: 'source-map',

    devServer: {
      //contentBase: path.join(__dirname, "public/"),
      contentBase: false,
      port: 3000,
      publicPath: 'http://localhost:3000/',
      //hotOnly: true,
      hot: true,
      open: true
    },

    resolve: { extensions: ['*', '.js', '.jsx'] },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
          //loader: 'babel-loader'
          //options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
        },
        // below: hot load, no modular css
        // {
        //   test: /\.(css|scss)$/,
        //   use: ["style-loader", "css-loader", 'postcss-loader', 'sass-loader']
        // },
        // below: extract css/no hot load, support modular css
        {
          test: /\.(css|scss)$/,
          use: [
            //'style-loader', // either this for hot load or MiniCssExtractPlugin.loader without hot load?
            MiniCssExtractPlugin.loader,
            //'css-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]_[local]_[hash:base64]'
                //sourceMap: true,
                //minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }
        // {
        //   test: /\.html$/,
        //   loader: 'html-loader'
        // }
      ]
    },

    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new MiniCssExtractPlugin({
        filename: 'static/css/style.[contenthash].css'
      }),
      //new FaviconsWebpackPlugin('./src/my-logo.png'),
      new FaviconsWebpackPlugin({
        //logo: path.resolve(process.cwd(), 'src/my-logo.png'),
        logo: path.resolve(__dirname, 'src/my-logo.png'),
        prefix: 'icons/[hash]/',
        emitStats: false,
        persistentCache: false,
        inject: true,
        //title: 'Company Editor',
        background: '#00b8ff',
        icons: {
          // android: true,
          // appleIcon: true,
          // appleStartup: true,
          // coast: false,
          // firefox: true,
          // opengraph: false,
          // twitter: false,
          // yandex: false,
          // windows: true,
          favicons: true
        }
      }),
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: './src/index.html',
        filename: 'index.html',
        title: argv.mode === 'production' ? 'Prod' : 'DEV'
      }),
      new WebpackMd5Hash(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
