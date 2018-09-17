/* eslint-env browser */

declare var document: any;

// polyfills
if (global.Promise === undefined) {
    const es6promise = require('es6-promise');

    es6promise.polyfill();
}

if (global.fetch === undefined) {
    require('whatwg-fetch');
}

// stylesheets
import './app/assets/styles.scss';
import './app/assets/fonts.scss';

// execute bootstrapper
import(/* webpackChunkName: "bootstrapper" */ './bootstrapper')
    .then(({ appStack }) => {
        const targetElement = document.getElementsByTagName('app')[0];
        appStack.renderToDOM(targetElement);
        // appStack.renderToString('/').then(x => console.log(x));

        // webpack
        if (module.hot !== undefined) {
            module.hot.accept(
                undefined,
                () => appStack.renderToDOM(targetElement, false),
            );
        }
    });
