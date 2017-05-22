const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: path.join(__dirname, "app/ts/main.ts"),
        vendor: path.join(__dirname, "app/ts/vendor.ts"),
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devServer: {
        inline: true,
        contentBase: './dist',
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
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=100000&name=../images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?limit=100000&name=../fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
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
