/* eslint-env node */
const express = require('express');
const path = require('path');
const fs = require('fs');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const StaticRouter = require('react-router-dom').StaticRouter;

const app = express();

const hostname = 'localhost';
const port = parseInt(process.env.PORT || '80', 10);

const pwd = process.cwd();

const serverRenderer = (req, res, next) => {
    const appStack = require(`${pwd}/dist/server`);

    const filePath = path.join(pwd, 'dist/index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            next();

            return;
        }

        // render the app as a string
        const context = {};
        const root = appStack.wrapWith(
            children =>
            // <StaticRouter location={req.originalUrl} context={context}>{children}</StaticRouter>
            React.createElement(
                StaticRouter,
                {
                    location: req.originalUrl,
                    context: context,
                },
                children
            )
        );

        const html = ReactDOMServer.renderToString(root);

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
        path.join(pwd, 'dist'),
        // {
        //     index: 'index.html',
        // },
    ),
);

app.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log(`🌎 Server is now running at http://${hostname}:${port}.`);
});
