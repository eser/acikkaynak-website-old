/* eslint-env node */
const { configWrapper, commonConfig } = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const browserConfig = configWrapper((vars) => {
    const common = commonConfig('browser')(vars.env, vars.argv);

    let optionalPlugins = [];

    if (vars.isProduction) {
        optionalPlugins = [
            ...optionalPlugins,
            new webpack.HotModuleReplacementPlugin(),
        ];
    }

    return {
        ...common,

        target: 'web',

        entry: {
            'browser': [ './src/core/index.browser.tsx' ],
        },

        output: {
            ...common.output,
        },

        devServer: {
            historyApiFallback: true,
            open: true,
        },

        module: {
            rules: [
                ...common.module.rules,
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(eot|ttf|jpe?g|png|gif|svg|ico)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff2?)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'url-loader',
                        },
                    ],
                },
            ],
        },

        plugins: [
            ...common.plugins,
            new MiniCssExtractPlugin({
                filename: '[name].css',
                // chunkFilename: '[id].[chunkhash].css',
                chunkFilename: '[id].css',
            }),
            new CopyWebpackPlugin([
                { from: './src/base/index.html', to: './' },
                { from: './src/base/apple-touch-icon-precomposed.png', to: './' },
                { from: './src/base/browserconfig.xml', to: './' },
                { from: './src/base/crossdomain.xml', to: './' },
                { from: './src/base/favicon.ico', to: './' },
                { from: './src/base/humans.txt', to: './' },
                { from: './src/base/robots.txt', to: './' },
                { from: './src/base/tile-wide.png', to: './' },
                { from: './src/base/tile.png', to: './' },
            ]),
            ...optionalPlugins,
        ],
    };
});

module.exports = browserConfig;
