/* eslint-env node */

import AppStack from './appStack';
import appMapping from '../../src/startup';

const appStack = new AppStack()
    .addRange(appMapping);

export default appStack;
