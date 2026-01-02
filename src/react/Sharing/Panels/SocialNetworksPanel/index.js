/**
 * SocialNetworksPanel component.
 */

import { useState, Suspense, useMemo, useEffect } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, Notice } from '@wordpress/components';
import { useFormContext, useWatch } from 'react-hook-form';
import { escapeEditableHTML } from '@wordpress/escape-html';
import NetworkSelector from '../../../Components/Shared/NetworkSelector';
import NetworkSettingsPopover from '../../../Components/Shared/NetworkSettingsPopover';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import hasNetworkErrors from '../../../Utils/hasNetworkErrors';
import ErrorBoundary from '../../../Components/ErrorBoundary';

/**
 * SocialNetworksPanel component.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.defaults Async resource for defaults data.
 * @return {JSX.Element} SocialNetworksPanel component.
 */
const SocialNetworksPanel = ( { defaults } ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Social Networks panel.', 'highlight-and-share' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<PanelBody
						title={ __( 'Social Networks', 'highlight-and-share' ) }
						initialOpen={ true }
						className="has-sharing-panel"
					>
						<div className="has-admin-component-row">
							<p>{ __( 'Loading…', 'highlight-and-share' ) }</p>
						</div>
					</PanelBody>
				}
			>
				<Interface defaults={ defaults } />
			</Suspense>
		</ErrorBoundary>
	);
};

/**
 * Panel interface component.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.defaults Async resource for defaults data.
 * @return {JSX.Element} Panel interface.
 */
const Interface = ( { defaults } ) => {
	const response = defaults();
	const { data } = response.data;

	// Get form methods from FormProvider context.
	const { control, clearErrors, trigger, formState: { errors }, reset } = useFormContext();

	// Reset form with actual data when it loads.
	useEffect( () => {
		if ( data?.values ) {
			const values = data.values;

			const formDefaults = {
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
			};

			reset( formDefaults );
		}
	}, [ data, reset ] );

	// Popover state management.
	const [ popoverNetwork, setPopoverNetwork ] = useState( null );
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	// Watch all network label and tooltip fields to trigger recomputation when they change.
	// This ensures networkErrors useMemo recomputes when clearErrors is called.
	const watchedFields = useWatch( {
		control,
		// Watch all network label and tooltip fields.
		name: data?.socialNetworks
			? Object.keys( data.socialNetworks ).flatMap( ( slug ) => {
				const fields = [ `${ slug }Label`, `${ slug }Tooltip` ];
				// Add network-specific fields.
				if ( slug === 'twitter' ) {
					fields.push( 'twitter', 'enableHashtags' );
				} else if ( slug === 'whatsapp' ) {
					fields.push( 'whatsappApiEndpoint', 'whatsappCanShareUrl' );
				}
				return fields;
			} )
			: [],
	} );

	/**
	 * Handle settings button mouse down.
	 *
	 * @param {MouseEvent} e           Mouse down event.
	 * @param {string}     networkSlug Network slug.
	 */
	const handleSettingsMouseDown = ( e, networkSlug ) => {
		e.stopPropagation();

		// Enable popover.
		setPopoverNetwork( networkSlug );
		setPopoverAnchor( e.currentTarget );
	};

	/**
	 * Handle popover close.
	 */
	const handlePopoverClose = () => {
		setPopoverNetwork( null );
		setPopoverAnchor( null );
	};

	/**
	 * Get network data for popover.
	 *
	 * @param {string} networkSlug Network slug.
	 * @return {Object|null} Network data or null.
	 */
	const getNetworkData = ( networkSlug ) => {
		if ( ! data || ! data.socialNetworks ) {
			return null;
		}
		return data.socialNetworks[ networkSlug ] || null;
	};

	/**
	 * Compute which networks have errors.
	 *
	 * @return {Object} Object mapping network slugs to boolean error state.
	 */
	const networkErrors = useMemo( () => {
		if ( ! data?.socialNetworks || ! errors ) {
			return {};
		}

		const errorMap = {};
		Object.keys( data.socialNetworks ).forEach( ( slug ) => {
			errorMap[ slug ] = hasNetworkErrors( slug, errors );
		} );

		return errorMap;
	}, [ data?.socialNetworks, errors, watchedFields ] );

	/**
	 * Get list of networks with errors for error message.
	 *
	 * @return {Array} Array of network labels with errors.
	 */
	const networksWithErrors = useMemo( () => {
		if ( ! data?.socialNetworks ) {
			return [];
		}

		return Object.keys( networkErrors )
			.filter( ( slug ) => networkErrors[ slug ] )
			.map( ( slug ) => {
				const network = data.socialNetworks[ slug ];
				return network?.label || network?.label_text || slug;
			} );
	}, [ networkErrors, data?.socialNetworks ] );

	/**
	 * Render global error message.
	 *
	 * @return {JSX.Element|null} Error notice or null.
	 */
	const renderErrorNotice = () => {
		if ( networksWithErrors.length === 0 ) {
			return null;
		}

		const networkList = networksWithErrors.join( ', ' );
		const message = sprintf(
			/* translators: %s: Comma-separated list of network names */
			__( 'The following networks have validation errors: %s', 'highlight-and-share' ),
			networkList
		);

		return (
			<Notice status="error" isDismissible={ false }>
				{ message }
			</Notice>
		);
	};

	return (
		<>
			{ /* Global error message at top */ }
			{ renderErrorNotice() }
			<PanelBodyWithIndicator
				panelId="socialNetworks"
				control={ control }
				title={ __( 'Social Networks', 'highlight-and-share' ) }
				defaultOpen={ true }
				className="has-sharing-panel"
			>
				<div className="has-admin-component-row">
					<p className="description">
						{ __(
							'Select which social networks to enable and configure their settings.',
							'highlight-and-share'
						) }
					</p>
				</div>
				<div className="has-admin-component-row">
					<NetworkSelector
						control={ control }
						networks={ data?.socialNetworks || {} }
						networkErrors={ networkErrors }
						onSettingsMouseDown={ handleSettingsMouseDown }
					/>
				</div>

				{ /* Network Settings Popover */ }
				{ popoverNetwork && popoverAnchor && (
					<NetworkSettingsPopover
						networkSlug={ popoverNetwork }
						network={ getNetworkData( popoverNetwork ) }
						control={ control }
						clearErrors={ clearErrors }
						trigger={ trigger }
						errors={ errors }
						onClose={ handlePopoverClose }
						anchor={ popoverAnchor }
					/>
				) }
			</PanelBodyWithIndicator>
			{ /* Global error message at bottom */ }
			{ renderErrorNotice() }
		</>
	);
};

export default SocialNetworksPanel;

