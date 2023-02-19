const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: ['@babel/plugin-proposal-class-properties'],
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
                test: /\.(js|jsx)$/,
                // use: ['source-map-loader'],
            },
            {
                loaders: ['style-loader', 'css-loader', 'less-loader'],
                test: /\.(less|css)$/,
            },
        ],
    },
    output: {
        filename: '[name].[hash:20].js',
        path: buildPath,
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            inject: true,
            template: './src/index.html',
        }),
    ],
    resolve: {
        alias: {
            Components: path.resolve(process.cwd(), 'src/components'),
            Modules: path.resolve(process.cwd(), 'src/modules'),
            Slices: path.resolve(process.cwd(), 'src/slices'),
            SourceRoot: path.resolve(process.cwd(), 'src'),
            Testing: path.resolve(process.cwd(), 'src/testing'),
            Utils: path.resolve(process.cwd(), 'src/utils'),
            dist: path.join(__dirname, './dist'),
            src: path.join(__dirname, './src'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};
