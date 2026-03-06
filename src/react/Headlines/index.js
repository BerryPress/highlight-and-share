/**
 * Headlines tab entry point.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Slot, SlotFillProvider } from '@wordpress/components';
import Headlines from './headlines';

const container = document.getElementById( 'has-headlines-admin' );
const slotContainer = document.getElementById( 'has-admin-container-slot' );
if ( container ) {
	container.innerHTML = '';
}
if ( container && slotContainer ) {
	const commonParent = slotContainer.parentElement;
	if ( commonParent && commonParent.contains( container ) ) {
		const rootContainer = document.createElement( 'div' );
		rootContainer.style.display = 'none';
		commonParent.appendChild( rootContainer );

		const root = createRoot( rootContainer );
		root.render(
			<React.StrictMode>
				<SlotFillProvider>
					{ createPortal( <Headlines />, container ) }
					{ createPortal( <Slot name="hasHeadlinesFooter" />, slotContainer ) }
				</SlotFillProvider>
			</React.StrictMode>
		);
	} else {
		const root = createRoot( container );
		root.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Headlines />
				</SlotFillProvider>
			</React.StrictMode>
		);
		const slotRoot = createRoot( slotContainer );
		slotRoot.render(
			<React.StrictMode>
				<SlotFillProvider>
					<Slot name="hasHeadlinesFooter" />
				</SlotFillProvider>
			</React.StrictMode>
		);
	}
}
