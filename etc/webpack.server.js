/* eslint-env node */
const { configWrapper, commonConfig } = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const serverConfig = configWrapper((vars) => {
    const common = commonConfig('server')(vars.env, vars.argv);

    return {
        ...common,

        target: 'node',
        externals: [ nodeExternals() ],

        entry: {
            'server': [ './src/core/index.server.tsx' ],
        },

        output: {
            ...common.output,
            // library: 'app',
            libraryExport: 'default',
            libraryTarget: 'commonjs2',
        },

        module: {
            rules: [
                ...common.module.rules,
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'css-loader/locals',
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'css-loader/locals',
                        },
                    ],
                },
                {
                    test: /\.(eot|ttf|jpe?g|png|gif|svg|ico)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'file-loader?emitFile=false'
                        },
                    ],
                },
                {
                    test: /\.(woff2?)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'url-loader?emitFile=false',
                        },
                    ],
                },
            ],
        },

        plugins: [
            ...common.plugins,
            new webpack.NamedModulesPlugin(),
        ],
    };
});

module.exports = serverConfig;
