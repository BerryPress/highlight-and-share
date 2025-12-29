/**
 * Hook for managing panel state with user meta persistence.
 */

import { useEffect, useCallback } from 'react';
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
			const store = select( STORE_NAME );
			return store.getPanelState( panelId );
		},
		[ panelId ]
	);

	const allPanelStates = useSelect(
		( select ) => {
			const store = select( STORE_NAME );
			return store.getAllPanelStates();
		},
		[]
	);

	const { setPanelState: setStorePanelState } = useDispatch( STORE_NAME );

	// Load panel states from user meta on mount (only once).
	useEffect( () => {
		let isMounted = true;

		sendCommand( 'has_get_admin_user_meta', {
			nonce: window.hasSharingAdmin?.userMetaNonce || '',
		} )
			.then( ( response ) => {
				if ( ! isMounted ) {
					return;
				}

				if ( response?.data?.success && response?.data?.data ) {
					const adminUserMeta = response.data.data;
					// Restore panel states from user meta.
					if ( adminUserMeta?.panel_states && typeof adminUserMeta.panel_states === 'object' ) {
						Object.keys( adminUserMeta.panel_states ).forEach( ( id ) => {
							setStorePanelState( id, adminUserMeta.panel_states[ id ] );
						} );
					} else {
						// Set default state if panel_states is invalid.
						setStorePanelState( panelId, defaultOpen );
					}
				} else {
					// Set default state if no saved state exists.
					setStorePanelState( panelId, defaultOpen );
				}
			} )
			.catch( () => {
				if ( ! isMounted ) {
					return;
				}
				// Set default state on error.
				setStorePanelState( panelId, defaultOpen );
			} );

		return () => {
			isMounted = false;
		};
	}, [] ); // Only run on mount.

	/**
	 * Set panel open state and save to user meta.
	 *
	 * @param {boolean} newState New open state.
	 */
	const setIsOpen = useCallback(
		( newState ) => {
			setStorePanelState( panelId, newState );

			// Update user meta with new state.
			const updatedPanelStates = {
				...allPanelStates,
				[ panelId ]: newState,
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

