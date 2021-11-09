const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

version = '0.5.14'

module.exports = {
    mode: 'production',
    entry: {
        'syntax-highlighter-miro-plugin': './src/miro-plugin/index.ts',
        'syntax-highlighter-settings': './src/settings/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.theme$/i,
                use: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        extensions: ['.tsx', '.ts', '.js','.css']
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/settings.html",
            filename: "./settings.html",
            templateParameters: {
                'version': version
            },
            chunks: ["syntax-highlighter-settings"],
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
            filename: "./index.html",
            templateParameters: {
                'version': version
            },
            chunks:["syntax-highlighter-miro-plugin"],
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/feedback.html",
            filename: "./feedback.html",
            templateParameters: {
                'version': version
            },
            inject: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/pages/install.html", to: "./install.html" },
                { from: "./docs", to: "./docs" }
            ]
        }),
    ]
};