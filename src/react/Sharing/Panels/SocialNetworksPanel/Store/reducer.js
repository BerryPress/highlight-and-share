/**
 * Reducer for Sharing tab store.
 */

/**
 * Default panel states (used when no server data).
 */
const defaultPanels = {
	socialNetworks: true,
	displayRules: false,
	appearance: false,
	preview: true,
	blockEditor: false,
	inlineHighlighting: false,
	advanced: false,
};

/**
 * Get initial panel states from server (window.hasSharingAdmin.panelStates) when available.
 * Ensures panels render with saved state on first paint regardless of registry timing.
 *
 * @return {Object} Panel states keyed by panel ID.
 */
function getInitialPanelsState() {
	if ( typeof window === 'undefined' || ! window.hasSharingAdmin?.panelStates ) {
		return defaultPanels;
	}
	const fromServer = window.hasSharingAdmin.panelStates;
	if ( typeof fromServer !== 'object' ) {
		return defaultPanels;
	}
	return {
		...defaultPanels,
		...Object.fromEntries(
			Object.entries( fromServer ).map( ( [ id, value ] ) => [ id, !! value ] )
		),
	};
}

/**
 * Initial state.
 */
const initialState = {
	// Panel visibility state (keyed by panel ID).
	panels: getInitialPanelsState(),
	// Network data (loaded from PHP).
	networks: {},
	// Preview state.
	preview: {
		isVisible: true,
	},
	// Sharing-specific settings.
	settings: {},
};

/**
 * Reducer function.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Action object.
 * @return {Object} New state.
 */
function reducer( state = initialState, action ) {
	switch ( action.type ) {
		case 'TOGGLE_PANEL':
			return {
				...state,
				panels: {
					...state.panels,
					[ action.panelId ]: ! state.panels[ action.panelId ],
				},
			};

		case 'SET_PANEL_STATE':
			return {
				...state,
				panels: {
					...state.panels,
					[ action.panelId ]: action.isOpen,
				},
			};

		case 'SET_NETWORKS':
			return {
				...state,
				networks: action.networks,
			};

		case 'SET_PREVIEW_VISIBILITY':
			return {
				...state,
				preview: {
					...state.preview,
					isVisible: action.isVisible,
				},
			};

		case 'SET_SETTINGS':
			return {
				...state,
				settings: action.settings,
			};
		case 'SET_THEME':
			return {
				...state,
				theme: action.theme,
			};
		case 'SET_HAS_ICONS_ONLY':
			return {
				...state,
				hasIconsOnly: action.hasIconsOnly,
			};
		case 'SET_SOCIAL_NETWORK_COLORS':
			return {
				...state,
				socialNetworkColors: action.socialNetworkColors,
			};
		case 'SET_THEME_DATA':
			return {
				...state,
				themeData: action.themeData,
			};
		case 'SET_CHECKPOINT':
			return {
				...state,
				checkpoint: action.data,
			};
		default:
			return state;
	}
}

export default reducer;

