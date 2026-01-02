/**
 * Sharing tab component.
 */

import { __ } from '@wordpress/i18n';
import { useForm, FormProvider } from 'react-hook-form';
import { Suspense } from 'react';
import './Store'; // Register the store before using components that depend on it.
import SocialNetworksPanel from './Panels/SocialNetworksPanel';
import DisplayRulesPanel from './Panels/DisplayRulesPanel';
import { useAsyncResource } from 'use-async-resource';
import sendCommand from '../Utils/SendCommand';
import { escapeEditableHTML } from '@wordpress/escape-html';

/**
 * Retrieve settings data from PHP.
 *
 * @return {Promise} Promise resolving to settings data.
 */
const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_settings_tab', {
		nonce: window.hasSharingAdmin?.retrieveNonce || window.hasSettingsAdmin?.retrieveNonce || '',
	} );
};

/**
 * Get default form values for all panels.
 *
 * @param {Object} values Values from PHP.
 * @return {Object} Default form values.
 */
export const getDefaultValues = ( values = {} ) => {
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

		// Post Types Exclusion (new feature).
		excludedPostTypes: values.excludedPostTypes || {}, // Object: { 'attachment': true, ... } - only excluded ones.
	};

	return defaultValues;
};

/**
 * Sharing tab interface component.
 *
 * @return {JSX.Element} Sharing tab component.
 */
const Sharing = () => {
	const [ defaults ] = useAsyncResource( retrieveDefaults, [] );

	// Set up global React Hook Form instance for all panels.
	// Default values will be reset when async data loads (in SocialNetworksPanel).
	const methods = useForm( {
		defaultValues: getDefaultValues( {} ), // Start with empty defaults, will be reset when data loads.
		mode: 'onBlur', // Validate on blur for better UX in popovers.
		reValidateMode: 'onChange', // Re-validate and clear errors immediately when user starts typing.
		shouldUnregister: false, // Keep fields registered even when not rendered.
	} );

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
							<SocialNetworksPanel defaults={ defaults } />
							<DisplayRulesPanel defaults={ defaults } />
						</FormProvider>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default Sharing;

