/**
 * Sharing tab component.
 */

import { __ } from '@wordpress/i18n';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { Suspense, useEffect } from 'react';
import { dispatch } from '@wordpress/data';
import store from './Store'; // Register the store before using components that depend on it.
import SocialNetworksPanel from './Panels/SocialNetworksPanel';
import DisplayRulesPanel from './Panels/DisplayRulesPanel';
import { useAsyncResource } from 'use-async-resource';
import sendCommand from '../Utils/SendCommand';
import { escapeEditableHTML } from '@wordpress/escape-html';
import ErrorBoundary from '../Components/ErrorBoundary';
import Loader from '../Components/Loader';
import AppearancesPanel from './Panels/AppearancesPanel';

/**
 * Retrieve settings data from PHP.
 *
 * @return {Promise} Promise resolving to settings data.
 */
const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_settings_tab', {
		nonce: window.hasSharingAdmin?.retrieveNonce,
	} );
};

/**
 * Get default form values for all panels.
 *
 * @param {Object} values    Values from PHP.
 * @param {Object} themeData Theme data from PHP.
 * @return {Object} Default form values.
 */
export const getDefaultValues = ( values = {}, themeData = {} ) => {
	// Build default values object with all network toggles and labels/tooltips.
	const defaultValues = {
		// Network toggles.
		showTwitter: values.showTwitter ?? false,
		showFacebook: values.showFacebook ?? false,
		showWhatsApp: values.showWhatsApp ?? false,
		showReddit: values.showReddit ?? false,
		showTelegram: values.showTelegram ?? false,
		showLinkedin: values.showLinkedin ?? false,
		showXing: values.showXing ?? false,
		showCopy: values.showCopy ?? false,
		showMastodon: values.showMastodon ?? false,
		showTumblr: values.showTumblr ?? false,
		showWebshare: values.showWebshare ?? false,
		showThreads: values.showThreads ?? false,
		showBluesky: values.showBluesky ?? false,
		enableEmails: values.enableEmails ?? false,

		// Network labels and tooltips.
		twitterLabel: escapeEditableHTML( values.twitterLabel || '' ),
		twitterTooltip: escapeEditableHTML( values.twitterTooltip || '' ),
		facebookLabel: escapeEditableHTML( values.facebookLabel || '' ),
		facebookTooltip: escapeEditableHTML( values.facebookTooltip || '' ),
		whatsappLabel: escapeEditableHTML( values.whatsappLabel || '' ),
		whatsappTooltip: escapeEditableHTML( values.whatsappTooltip || '' ),
		redditLabel: escapeEditableHTML( values.redditLabel || '' ),
		redditTooltip: escapeEditableHTML( values.redditTooltip || '' ),
		telegramLabel: escapeEditableHTML( values.telegramLabel || '' ),
		telegramTooltip: escapeEditableHTML( values.telegramTooltip || '' ),
		linkedinLabel: escapeEditableHTML( values.linkedinLabel || '' ),
		linkedinTooltip: escapeEditableHTML( values.linkedinTooltip || '' ),
		xingLabel: escapeEditableHTML( values.xingLabel || '' ),
		xingTooltip: escapeEditableHTML( values.xingTooltip || '' ),
		copyLabel: escapeEditableHTML( values.copyLabel || '' ),
		copyTooltip: escapeEditableHTML( values.copyTooltip || '' ),
		emailLabel: escapeEditableHTML( values.emailLabel || '' ),
		emailTooltip: escapeEditableHTML( values.emailTooltip || '' ),
		tumblrLabel: escapeEditableHTML( values.tumblrLabel || '' ),
		tumblrTooltip: escapeEditableHTML( values.tumblrTooltip || '' ),
		webshareLabel: escapeEditableHTML( values.webshareLabel || '' ),
		webshareTooltip: escapeEditableHTML( values.webshareTooltip || '' ),
		mastodonLabel: escapeEditableHTML( values.mastodonLabel || '' ),
		mastodonTooltip: escapeEditableHTML( values.mastodonTooltip || '' ),
		threadsLabel: escapeEditableHTML( values.threadsLabel || '' ),
		threadsTooltip: escapeEditableHTML( values.threadsTooltip || '' ),
		blueskyLabel: escapeEditableHTML( values.blueskyLabel || '' ),
		blueskyTooltip: escapeEditableHTML( values.blueskyTooltip || '' ),

		// Network-specific settings.
		twitter: escapeEditableHTML( values.twitter || '' ),
		enableHashtags: values.enableHashtags ?? false,
		whatsappApiEndpoint: values.whatsappApiEndpoint || 'app',
		whatsappCanShareUrl: values.whatsappCanShareUrl ?? true,

		// Display Rules options.
		enableMobile: values.enableMobile ?? true,
		enableContent: values.enableContent ?? true,
		enableExcerpt: values.enableExcerpt ?? true,
		enableComments: values.enableComments ?? false,
		sharingPrefix: escapeEditableHTML( values.sharingPrefix || '' ),
		sharingSuffix: escapeEditableHTML( values.sharingSuffix || '' ),

		// Appearance options.
		theme: themeData.theme ?? 'default',
		iconOnly: themeData.iconOnly ?? true,
		orientation: themeData.orientation ?? 'horizontal',
		showTooltips: themeData.showTooltips ?? true,
		tooltipsTextColor: themeData.tooltipsTextColor ?? '#FFFFFF',
		tooltipsBackgroundColor: themeData.tooltipsBackgroundColor ?? '#000000',
		groupIcons: themeData.groupIcons ?? true,
		backgroundColor: themeData.backgroundColor ?? '#000000',
		backgroundColorHover: themeData.backgroundColorHover ?? '#333333',
		iconColorsGroup: themeData.iconColorsGroup ?? '#FFFFFF',
		iconColorsGroupHover: themeData.iconColorsGroupHover ?? '#FFFFFF',
		borderRadiusGroup: themeData.borderRadiusGroup ?? {
			attrTop: 0,
			attrRight: 0,
			attrBottom: 0,
			attrLeft: 0,
		},
		iconBorderRadius: themeData.iconBorderRadius ?? {
			attrTop: 0,
			attrRight: 0,
			attrBottom: 0,
			attrLeft: 0,
		},
		fontSize: themeData.fontSize ?? 14,
		iconPadding: themeData.iconPadding ?? {
			attrTop: 12,
			attrRight: 20,
			attrBottom: 12,
			attrLeft: 20,
			attrUnit: 'px',
			attrSyncUnits: false,
		},
		iconSize: themeData.iconSize ?? 25,
		iconGap: themeData.iconGap ?? 0,

		// Post Types Exclusion.
		excludedPostTypes: themeData.excludedPostTypes || {},
	};

	return defaultValues;
};

/**
 * Sharing Component.
 *
 * @return {Element} Display Rules Panel with error boundary and suspense.
 */
const Sharing = () => {
	const [ defaults ] = useAsyncResource( retrieveDefaults, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Sharing panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<SharingInterface defaults={ defaults } />
			</Suspense>
		</ErrorBoundary>
	);
};

/**
 * Sharing tab interface component.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.defaults Async resource for defaults data.
 * @return {JSX.Element} Sharing tab component.
 */
const SharingInterface = ( { defaults } ) => {
	const response = defaults();
	const { data } = response.data;

	// Set up global React Hook Form instance for all panels.
	// Default values will be reset when async data loads (in SocialNetworksPanel).
	const methods = useForm( {
		defaultValues: getDefaultValues( {}, {} ), // Start with empty defaults, will be reset when data loads.
		mode: 'onBlur', // Validate on blur for better UX in popovers.
		reValidateMode: 'onChange', // Re-validate and clear errors immediately when user starts typing.
		shouldUnregister: false, // Keep fields registered even when not rendered.
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	} );

	const formValues = useWatch( {
		control: methods.control,
	} );

	// Set the initial form state when data loads.
	useEffect( () => {
		if ( data ) {
			dispatch( store ).setNetworks( data.socialNetworks );
			dispatch( store ).setTheme( data.themeOptions.theme );
			dispatch( store ).setThemeData( data.themeOptions );
			dispatch( store ).setSocialNetworkColors( data.themeOptions.iconColors );
			methods.reset( getDefaultValues( data.values, data.themeOptions ) );
		}
	}, [ data, methods ] );

	/**
	 * Convert underscore_case to camelCase.
	 *
	 * @param {string} str String in underscore_case.
	 * @return {string} String in camelCase.
	 */
	const toCamelCase = ( str ) => {
		if ( ! str ) {
			return str;
		}
		return str.replace( /_([a-z])/g, ( _, letter ) => letter.toUpperCase() );
	};

	/**
	 * Update networks object with enabled states from form values.
	 *
	 * @param {Object} networks Original networks object from data.
	 * @return {Object} Updated networks object with enabled properties.
	 */
	const updateNetworksFromFormValues = ( networks ) => {
		if ( ! networks || ! formValues ) {
			return networks || {};
		}

		const updatedNetworks = { ...networks };

		// Iterate through each network and update its enabled state.
		Object.keys( updatedNetworks ).forEach( ( networkSlug ) => {
			const network = updatedNetworks[ networkSlug ];
			if ( ! network ) {
				return;
			}

			// Get the enabled option key for this network.
			const enabledOptionKey = network.enabled_option_key || `show_${ networkSlug }`;
			// Convert to camelCase to match form field names.
			const formFieldName = toCamelCase( enabledOptionKey );

			// Update the enabled property from form values.
			// Default to false if form value is not found.
			updatedNetworks[ networkSlug ] = {
				...network,
				enabled: formValues[ formFieldName ] ?? false,
			};
		} );

		return updatedNetworks;
	};

	// Set Networks when form values change.
	useEffect( () => {
		if ( data?.socialNetworks && formValues ) {
			const updatedNetworks = updateNetworksFromFormValues( data.socialNetworks );
			dispatch( store ).setNetworks( updatedNetworks );
		}
	}, [ data?.socialNetworks, formValues ] );

	if ( ! data ) {
		return <div>{ __( 'Loading…', 'highlight-and-share' ) }</div>;
	}

	return (
		<div className="has-admin-content-wrapper">
			<div className="has-admin-content-panel">
				<div className="has-admin-content-heading">
					<h1>
						<span className="has-admin-content-heading-text">
							{ __( 'Sharing', 'highlight-and-share' ) }
						</span>
					</h1>
					<p className="description">
						{ __(
							'Configure how and where content can be shared across your site.',
							'highlight-and-share'
						) }
					</p>
				</div>
				<div className="has-admin-content-body">
					<Suspense fallback={ <div>{ __( 'Loading…', 'highlight-and-share' ) }</div> }>
						<FormProvider { ...methods }>
							<SocialNetworksPanel { ...data } />
							<DisplayRulesPanel />
							<AppearancesPanel { ...data } />
						</FormProvider>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default Sharing;
