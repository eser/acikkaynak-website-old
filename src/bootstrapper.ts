import { HashRouter } from 'react-router-dom';

import AppContainer from './app/appContainer';
import AppStackBuilder from './core/appStackBuilder';

const appStack = new AppStackBuilder()
    .useRouter(HashRouter, { hashType: 'slash' })
    // .useRouter(BrowserRouter)
    .add('/', AppContainer)
    .build();

export {
    appStack,
};
