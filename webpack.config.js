const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        app: "./app/ts/main.ts",
        vendor: "./app/ts/vendor.ts",
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            "url": false,
            "http": false,
            "https": false
        }
    },
    devServer: {
        static: './dist',
        historyApiFallback: true,
        port: 3000,
    },
    module: {
        rules:  [
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: 'url-loader?limit=100000&name=../images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?limit=100000&name=../fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.ProvidePlugin({
            Cookies: "js-cookie",
            "window.Cookies": "js-cookie"
        })
    ],
};
