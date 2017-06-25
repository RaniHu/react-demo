var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");                 //单独打包css

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/, loader: 'style!css!sass?sourceMap'
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ],
    },

    plugin: [
        new htmlWebpackPlugin({
            title: 'Hello React!',
            inject: false,
            template: './index.html'
        }),

    ],
};