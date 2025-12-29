/**
 * Sharing tab entry point.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Sharing from './sharing';
import './Store'; // Register the store.

const container = document.getElementById( 'has-sharing-admin' );
if ( container ) {
	const root = createRoot( container );
	root.render(
		<React.StrictMode>
			<Sharing />
		</React.StrictMode>
	);
}

