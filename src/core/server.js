/* eslint-env node */
const express = require('express');
const path = require('path');
const fs = require('fs');

const ReactDOMServer = require('react-dom/server');
const StaticRouter = require('react-router-dom').StaticRouter;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config.js');

const bundler = webpack(webpackConfig);
const app = express();

const hostname = 'localhost';
const port = parseInt(process.env.PORT, 10);

const serverRenderer = (req, res, next) => {
    // const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

    const appStack = require('./dist/app');
    // console.log(appStack);

    const filePath = path.join(__dirname, 'dist/index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            next();

            return;
        }

        // render the app as a string
        // const context = {};
        // const root = appStack.wrapWith(
        //     children =>
        //     <StaticRouter location={req.originalUrl} context={context}>{children}</StaticRouter>
        // );

        const html = req.originalUrl; // ReactDOMServer.renderToString(root);

        // inject the rendered app into our html and send it
        res.send(
            htmlData.replace(
                '<app></app>',
                `<app>${html}</app>`,
            ),
        );
    });
};

if (!('window' in global)) {
    global.window = {};
}

app.all('/', serverRenderer);

app.use(
    express.static(
        path.join(__dirname, 'dist'),
        // {
        //     index: 'index.html',
        // },
    ),
);

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
    writeToDisk: true,
}));

console.log('Enabling Webpack Hot Module Replacement (HMR).');
app.use(webpackHotMiddleware(bundler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
}));

app.use(serverRenderer);

app.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log(`🌎 Server is now running at http://${hostname}:${port}.`);
});
