# webpack_base_app

#### 解决哪些问题
1.ie8天生不支持vue, 所以以前的全家桶用不了
2.使用默认的webpack配置的项目在ie8里跑不起来怎么办？
3.项目里有php或者django变量怎么办？
4.需要兼容ie8，也想前端工程化?

#### 提供哪些功能
1.支持less, dev热更新
2.所有资源, 打包压缩，hash 
3.打包后支持ie8，但是仅限ie8能使用的api
4.支持嵌入php变量，参考html里面的     <%= htmlWebpackPlugin.options.phpCode %> 部分内容，与build文件里的配置项做映射处理
5.支持多页面，支持ie7+(因为项目虽然是ie8兼容，实际上ie7也能跑)，如果要用promise等，请根据项目兼容情况酌情添加

#### start

``` bash
// install
yarn
// dev
yarn dev
// build
yarn build
```


