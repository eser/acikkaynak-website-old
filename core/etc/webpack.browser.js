/* eslint-env node */
const { configWrapper, commonConfig } = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

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
            'browser': [ './core/src/index.browser.tsx' ],
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
                        ExtractCssChunksPlugin.loader,
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
                                path: path.resolve(__dirname),
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
                        ExtractCssChunksPlugin.loader,
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
                                path: path.resolve(__dirname),
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
            new ExtractCssChunksPlugin({
                filename: '[name].css',
                // chunkFilename: '[id].[chunkhash].css',
                chunkFilename: '[id].css',
            }),
            new CopyWebpackPlugin([
                { from: './src/index.html', to: './' },
                { from: './src/apple-touch-icon-precomposed.png', to: './' },
                { from: './src/browserconfig.xml', to: './' },
                { from: './src/crossdomain.xml', to: './' },
                { from: './src/favicon.ico', to: './' },
                { from: './src/humans.txt', to: './' },
                { from: './src/robots.txt', to: './' },
                { from: './src/tile-wide.png', to: './' },
                { from: './src/tile.png', to: './' },
            ]),
            ...optionalPlugins,
        ],
    };
});

module.exports = browserConfig;
