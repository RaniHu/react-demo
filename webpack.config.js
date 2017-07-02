var htmlWebpackPlugin = require('html-webpack-plugin');

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
    // externals: {
        "JQuery": "$",
    //     "react-dom": "ReactDOM"
    // },
};