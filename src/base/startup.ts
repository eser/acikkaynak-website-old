import AppStack from '../core/appStack';

import AppContainer from './app/appContainer';

const appStack = new AppStack()
    .add('/', AppContainer);

export {
    appStack,
};
