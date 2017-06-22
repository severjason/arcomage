const path = require("path");
// const webpack = require("webpack");

module.exports = {
    entry: './app/test/unit/index.spec.ts',
    output: {
        path: path.join(__dirname, "test/unit"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: ["babel-loader", "ts-loader"],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [

    ],
};
