import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Slot, SlotFillProvider } from '@wordpress/components';
import Images from './images';

const container = document.getElementById( 'has-images-admin-settings' );
const slotContainer = document.getElementById( 'has-admin-container-slot' );
container.innerHTML = '';
// If both containers exist, use a shared SlotFillProvider with portals.
if ( container && slotContainer ) {
	const commonParent = slotContainer.parentElement;
	if ( commonParent && commonParent.contains( container ) ) {
		// Create a hidden root container for the shared provider.
		const rootContainer = document.createElement( 'div' );
		rootContainer.style.display = 'none';
		commonParent.appendChild( rootContainer );

		const root = createRoot( rootContainer );
		root.render(
			<React.StrictMode>
				<SlotFillProvider>
					{ createPortal( <Images />, container ) }
					{ createPortal( <Slot name="hasImagesFooter" />, slotContainer ) }
				</SlotFillProvider>
			</React.StrictMode>
		);
	} else {
		// Fallback: render separately if no common parent found.
		const root = createRoot( container );
		root.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Images />
				</SlotFillProvider>
			</React.StrictMode>
		);
		const slotRoot = createRoot( slotContainer );
		slotRoot.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Slot name="hasImagesFooter" />
				</SlotFillProvider>
			</React.StrictMode>
		);
	}
}
