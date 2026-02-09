/**
 * Hook for managing panel state with user meta persistence.
 *
 * Panel states are loaded once by the Sharing tab; this hook only reads from
 * the store and persists changes on toggle.
 */

import { useCallback } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import sendCommand from '../Utils/SendCommand';

const STORE_NAME = 'has/sharing';

/**
 * Hook to manage panel state with user meta persistence.
 *
 * @param {string}  panelId     Panel ID.
 * @param {boolean} defaultOpen Default open state.
 * @return {Array} [isOpen, setIsOpen] tuple.
 */
export default function usePanelState( panelId, defaultOpen = false ) {
	const isOpen = useSelect(
		( select ) => {
			try {
				const store = select( STORE_NAME );
				if ( ! store || ! store.getPanelState ) {
					return defaultOpen;
				}
				return store.getPanelState( panelId );
			} catch ( error ) {
				// Store not registered yet, return default.
				return defaultOpen;
			}
		},
		[ panelId, defaultOpen ]
	);

	const allPanelStates = useSelect(
		( select ) => {
			try {
				const store = select( STORE_NAME );
				if ( ! store || ! store.getAllPanelStates ) {
					return {};
				}
				return store.getAllPanelStates();
			} catch ( error ) {
				// Store not registered yet, return empty object.
				return {};
			}
		},
		[]
	);

	const dispatch = useDispatch( STORE_NAME );
	const setStorePanelState = dispatch?.setPanelState || ( () => {} );

	/**
	 * Set panel open state and save to user meta.
	 *
	 * @param {boolean} newState New open state (true = open, false = closed).
	 */
	const setIsOpen = useCallback(
		( newState ) => {
			setStorePanelState( panelId, newState );

			// Build payload with the toggled panel set to newState (use callback arg, not store, to avoid stale closure).
			const updatedPanelStates = {
				...allPanelStates,
				[ panelId ]: Boolean( newState ),
			};

			// Send the full admin user meta structure.
			sendCommand( 'has_set_admin_user_meta', {
				value: {
					panel_states: updatedPanelStates,
				},
				nonce: window.hasSharingAdmin?.userMetaNonce || '',
			} ).catch( () => {
				// Silently fail if user meta update fails.
			} );
		},
		[ panelId, allPanelStates, setStorePanelState ]
	);

	return [ isOpen, setIsOpen ];
}

