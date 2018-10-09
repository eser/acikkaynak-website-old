/* eslint-env node */
const { configWrapper, commonConfig } = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const serverConfig = configWrapper((vars) => {
    const common = commonConfig(vars.env, vars.argv);

    return {
        ...common,

        target: 'node',
        externals: [ nodeExternals() ],

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
            'base': './src/core/index.server.tsx',
        },

        output: {
            ...common.output,
            path: path.join(vars.dirRoot, 'dist/server'),
            libraryExport: 'default',
            libraryTarget: 'commonjs2',
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
            new webpack.NamedModulesPlugin(),
        ],
    };
});

module.exports = serverConfig;
