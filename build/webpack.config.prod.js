const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 线上代码：你可以根据环境自定义代码，php的模板变量或者python的Django都是可以的
// let customCode = '<script>var nick = '$php-name';</script>';
let customCode ='the font is source by webpack.config.js';
let publicPath = '/'
let staticPath = 'static/'

module.exports = {
  entry: {
    index: './src/js/index.js',
    product: './src/js/product.js'
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: staticPath + 'img/[name].[hash:13].[ext]'
        }
      },
      {
        test: /\.less$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: publicPath,
              hmr: false
            },
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: publicPath,
              hmr: false
            },
          },
          'css-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
    }),
    new es3ifyPlugin(),
    new MiniCssExtractPlugin({
      filename: staticPath + 'css/[name].[contenthash].css',
      allChunks: true
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['index'],
      inject: true,
      minify: false,
      phpCode: phpCode,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'product.html',
      template: 'public/product.html',
      chunks: ['product'],
      inject: true,
      minify: false,
      customCode: customCode,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ],
  output: {
    filename: staticPath + 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: publicPath
  }
};