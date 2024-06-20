import React from 'react';
import { createRoot } from 'react-dom/client';
import Images from './images';

const container = document.getElementById( 'has-images-admin-settings' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Images />
	</React.StrictMode>
);
