/**
 * Utility function to check if a network has validation errors.
 *
 * This matches the field naming pattern used in NetworkSettingsPopover.
 *
 * @param {string} networkSlug Network slug (e.g., 'twitter', 'facebook', 'bluesky').
 * @param {Object} errors      React Hook Form errors object.
 * @return {boolean} True if network has any errors.
 */
export default function hasNetworkErrors( networkSlug, errors ) {
	if ( ! errors || ! networkSlug ) {
		return false;
	}

	/**
	 * Get label field name for network (matches NetworkSettingsPopover logic).
	 *
	 * @return {string} Field name.
	 */
	const getLabelFieldName = () => {
		// Special cases.
		if ( networkSlug === 'twitter' ) {
			return 'twitterLabel';
		}
		if ( networkSlug === 'mastodon' ) {
			return 'mastodonLabel';
		}
		// Default pattern - use slug directly (e.g., 'bluesky' -> 'blueskyLabel').
		return `${ networkSlug }Label`;
	};

	/**
	 * Get tooltip field name for network (matches NetworkSettingsPopover logic).
	 *
	 * @return {string} Field name.
	 */
	const getTooltipFieldName = () => {
		// Special cases.
		if ( networkSlug === 'twitter' ) {
			return 'twitterTooltip';
		}
		if ( networkSlug === 'mastodon' ) {
			return 'mastodonTooltip';
		}
		// Default pattern - use slug directly (e.g., 'bluesky' -> 'blueskyTooltip').
		return `${ networkSlug }Tooltip`;
	};

	// Get base field names.
	const labelFieldName = getLabelFieldName();
	const tooltipFieldName = getTooltipFieldName();

	// List of possible field names for each network.
	const fieldsToCheck = [ labelFieldName, tooltipFieldName ];

	// Add network-specific fields.
	if ( networkSlug === 'twitter' ) {
		fieldsToCheck.push( 'twitter', 'enableHashtags' );
	} else if ( networkSlug === 'whatsapp' ) {
		fieldsToCheck.push( 'whatsappApiEndpoint', 'whatsappCanShareUrl' );
	}

	// Check if any of the network's fields have errors.
	// React Hook Form errors are objects like: { fieldName: { type: 'required', message: '...' } }
	const hasError = fieldsToCheck.some( ( fieldName ) => {
		const fieldError = errors[ fieldName ];
		// Error exists if it's defined and is an object (React Hook Form error structure).
		return fieldError !== undefined && fieldError !== null;
	} );

	return hasError;
}

