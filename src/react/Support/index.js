import React from 'react';
import { createRoot } from 'react-dom/client';
import Support from './support';

const container = document.getElementById( 'has-support-admin-settings' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Support />
	</React.StrictMode>
);
