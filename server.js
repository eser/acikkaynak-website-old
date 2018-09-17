/* eslint-env node */
const express = require('express');
const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfigGenerator = require('./webpack.config.js');
const webpackConfig = webpackConfigGenerator(undefined, {});

const bundler = webpack(webpackConfig);
const app = express();
const router = express.Router();

console.log('Enabling Webpack dev middleware.');
app.use(webpackDevMiddleware(bundler, {
    lazy: false,
    logLevel: 'info',
    logTime: true,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: Object.assign(
        {},
        webpackConfig.stats,
        {
            assets: false,
            chunks: false,
            modules: false,
        },
    ),
}));

console.log('Enabling Webpack Hot Module Replacement (HMR).');
app.use(webpackHotMiddleware(bundler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
}));

const hostname = 'localhost';
const port = parseInt(process.env.PORT, 10);

const serverRenderer = (req, res) => {
    // const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

    const appStack = require('./dist/app');
    // console.log(appStack);

    const filePath = path.join(__dirname, 'dist/index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);

            res.status(404).end();

            return;
        }

        // render the app as a string
        const html = appStack.renderToString(req.originalUrl);

        // inject the rendered app into our html and send it
        res.send(
            htmlData.replace(
                '<app></app>',
                `<app>${html}</app>`,
            ),
        );
    });
};

// app.use('^/$', serverRenderer);

app.use(
    express.static(
        path.join(__dirname, 'dist'),
        // {
        //     index: 'index.html',
        // },
    ),
);

app.use(router);

    // res.send(`path not found - ${req.originalUrl}`);

app.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log(`🌎 Server is now running at http://${hostname}:${port}.`);
});
