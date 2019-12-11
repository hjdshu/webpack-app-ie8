const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

let customCode ='the font is source by webpack.config.js';
let publicPath = '/';

module.exports = {
  entry: {
    index: './src/js/index.js',
    product: './src/js/product.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.less$/,
        use:[
          'style-loader',
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
              hmr: true
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
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
      inject: true,
      chunks: ['index'],
      customCode: customCode
    }),
    new HtmlWebpackPlugin({
      filename: 'product.html',
      template: 'public/product.html',
      inject: true,
      chunks: ['product']
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/static'),
    publicPath: publicPath
  },
  devServer: {
		host: "localhost",
		port: 9000,
		overlay: true, // 浏览器页面上显示错误
    open: true, // 开启浏览器
    watchOptions: {
      poll: true
    },
    quiet: true,
		// stats: "errors-only", //stats: "errors-only"表示只打印错误：
    hot: true, // 开启热更新
    before(app, server, compiler) {
      const watchFiles = ['.html', '.hbs'];
      compiler.plugin('done', () => {
        const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);
        if (
          this.hot &&
          changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
        ) {
          server.sockWrite(server.sockets, 'content-changed');
        }
      });
    }
	},
};