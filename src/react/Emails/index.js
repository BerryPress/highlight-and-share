import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Slot, SlotFillProvider } from '@wordpress/components';
import Emails from './emails';

const container = document.getElementById( 'has-emails-admin-settings' );
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
					{ createPortal( <Emails />, container ) }
					{ createPortal( <Slot name="hasEmailsFooter" />, slotContainer ) }
				</SlotFillProvider>
			</React.StrictMode>
		);
	} else {
		// Fallback: render separately if no common parent found.
		const root = createRoot( container );
		root.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Emails />
				</SlotFillProvider>
			</React.StrictMode>
		);
		const slotRoot = createRoot( slotContainer );
		slotRoot.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Slot name="hasEmailsFooter" />
				</SlotFillProvider>
			</React.StrictMode>
		);
	}
}
