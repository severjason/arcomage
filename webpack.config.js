const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: path.join(__dirname, "app/ts/action.ts"),
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devServer: {
        inline: true,
        contentBase: './public',
        historyApiFallback: true,
        port: 3000,
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: ["babel-loader", "ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            debug: true,
            minimize: true,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            },
            mangle: {
                keep_fnames: true
            }
        }),
    ]
};
