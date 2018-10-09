/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configWrapper = (targetConfigFunction) => (env, argv) => {
    const dirRoot = path.resolve(__dirname, '../');

    const envValue = argv.mode || process.env.NODE_ENV || 'development';
    const isProduction = (envValue === 'production');

    return targetConfigFunction({
        env,
        argv,
        dirRoot,
        envValue,
        isProduction,
    });
};

const commonConfig = configWrapper((vars) => {
    return {
        mode: vars.isProduction ? 'production' : 'development',
        devtool: vars.isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        context: vars.dirRoot,

        output: {
            filename: '[name].js',
            // chunkFilename: '[id].[chunkhash].js',
            chunkFilename: '[id].js',
            publicPath: '/',
            // hotUpdateChunkFilename: 'hot/hot-update.js',
            // hotUpdateMainFilename: 'hot/hot-update.json',
        },

        module: {
            rules: [
                {
                    test: /\.[tj]sx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
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
                    test: /\.(eot|woff2?|ttf|jpe?g|png|gif|svg|ico)([\?]?.*)$/,
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
            ],
        },

        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
            modules: [
                path.join(vars.dirRoot, 'src'),
                path.join(vars.dirRoot, 'node_modules'),
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(vars.envValue),
                },
            }),
            new DotenvPlugin({
                sample: './.env.default',
                path: './.env',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                // chunkFilename: '[id].[chunkhash].css',
                chunkFilename: '[id].css',
            }),
            new BundleAnalyzerPlugin({
                // Start analyzer HTTP-server.
                // You can use this plugin to just generate Webpack Stats JSON file by setting
                // `startAnalyzer` to `false` and `generateStatsFile` to `true`.
                startAnalyzer: false,
                // Analyzer HTTP-server port
                analyzerPort: 8888,
                // Automatically open analyzer page in default browser if `startAnalyzer` is `true`
                openAnalyzer: true,
                // If `true`, Webpack Stats JSON file will be generated in bundles output directory
                generateStatsFile: true,
                // Name of Webpack Stats JSON file that will be generated if `generateStatsFile`
                // is `true`. Relative to bundles output directory.
                statsFilename: 'base-stats.json',
            }),
        ],

        stats: {
            children: false,
            colors: true,
            entrypoints: true,
            env: true,
            modules: false,
        },
    };
});

module.exports = {
    configWrapper,
    commonConfig,
};
