var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/js/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' },

        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ],
    },


    postcss: [
        require('autoprefixer') //调用autoprefixer插件，例如 display: flex
    ],

    plugin: [
        new htmlWebpackPlugin({
            title: 'Hello React!',
            inject: false,
            template: './index.html'
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

    ],

    devServer: {
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转,如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: "0.0.0.0",  // 使用热加载插件 HotModuleReplacementPlugin
    }
};