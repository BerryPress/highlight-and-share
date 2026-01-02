/**
 * Selectors for Sharing tab store.
 */

/**
 * Get panel open state.
 *
 * @param {Object} state   Store state.
 * @param {string} panelId Panel ID.
 * @return {boolean} Whether panel is open.
 */
export function getPanelState( state, panelId ) {
	return state.panels[ panelId ] || false;
}

/**
 * Get all panel states.
 *
 * @param {Object} state Store state.
 * @return {Object} All panel states.
 */
export function getAllPanelStates( state ) {
	return state.panels;
}

/**
 * Get networks data.
 *
 * @param {Object} state Store state.
 * @return {Object} Networks data.
 */
export function getNetworks( state ) {
	return state.networks;
}

/**
 * Get preview visibility.
 *
 * @param {Object} state Store state.
 * @return {boolean} Whether preview is visible.
 */
export function getPreviewVisibility( state ) {
	return state.preview.isVisible;
}

/**
 * Get settings.
 *
 * @param {Object} state Store state.
 * @return {Object} Settings.
 */
export function getSettings( state ) {
	return state.settings;
}

export function getTheme( state ) {
	return state.theme;
}

export function getThemeData( state ) {
	return state.themeData;
}

export function getHasIconsOnly( state ) {
	return state.hasIconsOnly;
}

export function getSocialNetworkColors( state ) {
	return state.socialNetworkColors;
}
