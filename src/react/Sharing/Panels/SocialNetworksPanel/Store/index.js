/**
 * WordPress data store for Sharing tab state.
 */

import { createReduxStore, register } from '@wordpress/data';
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

const STORE_NAME = 'has/sharing';

/**
 * Store definition.
 */
const store = createReduxStore( STORE_NAME, {
	reducer,
	selectors,
	actions,
} );

register( store );

export default store;

