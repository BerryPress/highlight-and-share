/**
 * Sharing tab entry point.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Slot, SlotFillProvider } from '@wordpress/components';
import Sharing from './sharing';
import './Store'; // Register the store.

const container = document.getElementById( 'has-sharing-admin' );
const slotContainer = document.getElementById( 'has-admin-container-slot' );

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
					{ createPortal( <Sharing />, container ) }
					{ createPortal( <Slot name="hasSharingFooter" />, slotContainer ) }
				</SlotFillProvider>
			</React.StrictMode>
		);
	} else {
		// Fallback: render separately if no common parent found.
		const root = createRoot( container );
		root.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Sharing />
				</SlotFillProvider>
			</React.StrictMode>
		);
		const slotRoot = createRoot( slotContainer );
		slotRoot.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Slot name="hasSharingFooter" />
				</SlotFillProvider>
			</React.StrictMode>
		);
	}
}
