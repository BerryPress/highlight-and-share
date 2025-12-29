/**
 * Actions for Sharing tab store.
 */

/**
 * Toggle panel open/closed state.
 *
 * @param {string} panelId Panel ID.
 * @return {Object} Action object.
 */
export function togglePanel( panelId ) {
	return {
		type: 'TOGGLE_PANEL',
		panelId,
	};
}

/**
 * Set panel open/closed state.
 *
 * @param {string}  panelId Panel ID.
 * @param {boolean} isOpen  Whether panel should be open.
 * @return {Object} Action object.
 */
export function setPanelState( panelId, isOpen ) {
	return {
		type: 'SET_PANEL_STATE',
		panelId,
		isOpen,
	};
}

/**
 * Set networks data.
 *
 * @param {Object} networks Networks data.
 * @return {Object} Action object.
 */
export function setNetworks( networks ) {
	return {
		type: 'SET_NETWORKS',
		networks,
	};
}

/**
 * Set preview visibility.
 *
 * @param {boolean} isVisible Whether preview should be visible.
 * @return {Object} Action object.
 */
export function setPreviewVisibility( isVisible ) {
	return {
		type: 'SET_PREVIEW_VISIBILITY',
		isVisible,
	};
}

/**
 * Set settings.
 *
 * @param {Object} settings Settings object.
 * @return {Object} Action object.
 */
export function setSettings( settings ) {
	return {
		type: 'SET_SETTINGS',
		settings,
	};
}

