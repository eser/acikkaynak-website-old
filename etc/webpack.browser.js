/* eslint-env node */
const { configWrapper, commonConfig } = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'; // &reload=true

const browserConfig = configWrapper((vars) => {
    const common = commonConfig(vars.env, vars.argv);

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
            'base-vendor': [
                'es6-cachemanager',
                'react',
                'react-eventmanager',
                'react-intl',
                'react-markdown',
                'react-router',
                'servicemanager'
            ],
            'base': vars.isProduction ? [ './src/core/index.browser.tsx' ] : [ hotMiddlewareScript, './src/core/index.browser.tsx' ],
        },

        output: {
            ...common.output,
            path: path.join(vars.dirRoot, 'dist/browser'),
        },

        plugins: [
            ...common.plugins,
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
