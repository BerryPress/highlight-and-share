/**
 * Sharing tab component.
 */

import { __ } from '@wordpress/i18n';
import { useForm, FormProvider, useWatch, useFormState } from 'react-hook-form';
import { Suspense, useEffect, useState } from 'react';
import { dispatch, useSelect } from '@wordpress/data';
import classnames from 'classnames';
import { Button, Spinner, Fill } from '@wordpress/components';
import store from './Store'; // Register the store before using components that depend on it.
import SocialNetworksPanel from './Panels/SocialNetworksPanel';
import DisplayRulesPanel from './Panels/DisplayRulesPanel';
import { useAsyncResource } from 'use-async-resource';
import sendCommand from '../Utils/SendCommand';
import { escapeEditableHTML } from '@wordpress/escape-html';
import ErrorBoundary from '../Components/ErrorBoundary';
import Loader from '../Components/Loader';
import AppearancesPanel from './Panels/AppearancesPanel';
import PreviewPanel from './Panels/PreviewPanel';
import BlockEditorPanel from './Panels/BlockEditorPanel';
import InlineHighlightingPanel from './Panels/InlineHighlightingPanel';
import AdvancedPanel from './Panels/AdvancedPanel';

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

const socialNetworksPanelWatchValues = [
	'showTwitter',
	'showFacebook',
	'showWhatsApp',
	'showReddit',
	'showTelegram',
	'showLinkedin',
	'showXing',
	'showCopy',
	'showMastodon',
	'showTumblr',
	'showWebshare',
	'showThreads',
	'showBluesky',
	'enableEmails',
	'twitterLabel',
	'twitterTooltip',
	'facebookLabel',
	'facebookTooltip',
	'whatsappLabel',
	'whatsappTooltip',
	'redditLabel',
	'redditTooltip',
	'telegramLabel',
	'telegramTooltip',
	'linkedinLabel',
	'linkedinTooltip',
	'xingLabel',
	'xingTooltip',
	'copyLabel',
	'copyTooltip',
	'emailLabel',
	'emailTooltip',
	'tumblrLabel',
	'tumblrTooltip',
	'webshareLabel',
	'webshareTooltip',
	'mastodonLabel',
	'mastodonTooltip',
	'threadsLabel',
	'threadsTooltip',
	'blueskyLabel',
	'blueskyTooltip',
	'twitter',
	'enableHashtags',
	'whatsappApiEndpoint',
	'whatsappCanShareUrl',
];

const displayRulesPanelWatchValues = [
	'enableMobile',
	'enableContent',
	'enableExcerpt',
	'enableComments',
	'sharingPrefix',
	'sharingSuffix',
	'excludedPostTypes',
];

const appearancePanelWatchValues = [
	'theme',
	'iconsOnly',
	'orientation',
	'showTooltips',
	'tooltipsTextColor',
	'tooltipsBackgroundColor',
	'groupIcons',
	'backgroundColor',
	'backgroundColorHover',
	'networkOrder',
	'iconColors',
	'iconColorsGroup',
	'iconColorsGroupHover',
	'borderRadiusGroup',
	'iconBorderRadius',
	'fontSize',
	'iconPadding',
	'iconSize',
	'iconGap',
];

const blockEditorPanelWatchValues = [
	'enableBlocks',
	'enableAdobeFonts',
	'adobeProjectId',
	'adobeFonts',
];

const inlineHighlightingPanelWatchValues = [
	'enableInlineHighlighting',
	'inlineHighlightBackgroundColor',
	'inlineHighlightBackgroundColorHover',
	'inlineHighlightTextColor',
	'inlineHighlightTextColorHover',
	'inlineHighlightTooltipsText',
	'inlineHighlightShowTooltips',
	'inlineHighlightTooltipsBackgroundColor',
	'inlineHighlightTooltipsTextColor',
];

const advancedPanelWatchValues = [
	'jsContent',
	'elementContent',
	'idContent',
	'wrapperClasses',
	'shortlinks',
];
/**
 * Get default form values for all panels.
 *
 * @param {Object} values            Values from PHP.
 * @param {Object} themeData         Theme data from PHP.
 * @param {Object} blockEditorValues Block editor values from PHP.
 * @return {Object} Default form values.
 */
export const getDefaultValues = ( values = {}, themeData = {}, blockEditorValues = {} ) => {
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

		// Advanced options.
		jsContent: escapeEditableHTML( values.jsContent || '' ),
		elementContent: escapeEditableHTML( values.elementContent || '' ),
		idContent: escapeEditableHTML( values.idContent || '' ),
		wrapperClasses: escapeEditableHTML( values.wrapperClasses || '' ),
		shortlinks: values.shortlinks ?? false,

		// Block Editor options.
		enableBlocks: blockEditorValues?.enableBlocks ?? true,
		enableAdobeFonts: blockEditorValues?.enableAdobeFonts ?? false,
		adobeProjectId: escapeEditableHTML( blockEditorValues?.adobeProjectId || '' ),
		adobeFonts: blockEditorValues?.adobeFonts || [],

		// Inline Highlighting options.
		enableInlineHighlighting: blockEditorValues?.enableInlineHighlighting ?? false,
		inlineHighlightBackgroundColor: blockEditorValues?.inlineHighlightBackgroundColor || '#ffefb1',
		inlineHighlightBackgroundColorHover: blockEditorValues?.inlineHighlightBackgroundColorHover || '#fcd63c',
		inlineHighlightTextColor: blockEditorValues?.inlineHighlightTextColor || '#000000',
		inlineHighlightTextColorHover: blockEditorValues?.inlineHighlightTextColorHover || '#000000',
		inlineHighlightTooltipsText: escapeEditableHTML( blockEditorValues?.inlineHighlightTooltipsText || '' ),
		inlineHighlightShowTooltips: blockEditorValues?.inlineHighlightShowTooltips ?? false,
		inlineHighlightTooltipsBackgroundColor: blockEditorValues?.inlineHighlightTooltipsBackgroundColor || '#000000',
		inlineHighlightTooltipsTextColor: blockEditorValues?.inlineHighlightTooltipsTextColor || '#FFFFFF',

		// Appearance options.
		theme: themeData.theme ?? 'default',
		networkOrder: [],
		iconsOnly: themeData.iconsOnly ?? true,
		orientation: themeData.orientation ?? 'horizontal',
		showTooltips: themeData.showTooltips ?? true,
		tooltipsTextColor: themeData.tooltipsTextColor ?? '#FFFFFF',
		tooltipsBackgroundColor: themeData.tooltipsBackgroundColor ?? '#000000',
		groupIcons: themeData.groupIcons ?? true,
		backgroundColor: themeData.backgroundColor ?? '#000000',
		backgroundColorHover: themeData.backgroundColorHover ?? '#333333',
		iconColors: themeData.iconColors ?? [],
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

	const [ saving, setSaving ] = useState( false );
	const [ resetting, setResetting ] = useState( false );

	// Set up global React Hook Form instance for all panels.
	// Default values will be reset when async data loads (in SocialNetworksPanel).
	const methods = useForm( {
		defaultValues: getDefaultValues( {}, {}, {} ), // Start with empty defaults, will be reset when data loads.
		mode: 'onBlur', // Validate on blur for better UX in popovers.
		reValidateMode: 'onChange', // Re-validate and clear errors immediately when user starts typing.
		shouldUnregister: false, // Keep fields registered even when not rendered.
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	} );

	const isDirtyFields = useFormState( {
		control: methods.control,
	} ).isDirty;

	const errors = useFormState( {
		control: methods.control,
	} ).errors;

	const hasErrors = Object.keys( errors ).length > 0 ? true : false;


	// Set the initial form state when data loads.
	useEffect( () => {
		if ( data ) {
			dispatch( store ).setNetworks( data.socialNetworks );
			dispatch( store ).setSettings( data.values );
			dispatch( store ).setTheme( data.themeOptions.theme );
			dispatch( store ).setThemeData( data.themeOptions );
			dispatch( store ).setSocialNetworkColors( data.themeOptions.iconColors );
			methods.reset( getDefaultValues( data.values, data.themeOptions, data.blockEditorOptions ) );
		}
	}, [ data, methods ] );

	const formValues = useWatch( {
		control: methods.control,
	} );

	if ( ! data ) {
		return <div>{ __( 'Loading…', 'highlight-and-share' ) }</div>;
	}

	return (
		<>
			<FormProvider { ...methods }>
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
									'Configure how and where content can be shared across your site, whether through text selection, a Click to Share block, or inline highlighting.',
									'highlight-and-share'
								) }
							</p>
						</div>
						<div className="has-admin-content-body">
							<Suspense fallback={ <div>{ __( 'Loading…', 'highlight-and-share' ) }</div> }>
								<SocialNetworksPanel { ...data } watchFields={ socialNetworksPanelWatchValues } />
								<DisplayRulesPanel watchFields={ displayRulesPanelWatchValues } />
								<AppearancesPanel { ...data } watchFields={ appearancePanelWatchValues } />
								<PreviewPanel { ...data } />
								<BlockEditorPanel watchFields={ blockEditorPanelWatchValues } />
								<InlineHighlightingPanel watchFields={ inlineHighlightingPanelWatchValues } />
								<AdvancedPanel watchFields={ advancedPanelWatchValues } />
							</Suspense>
						</div>
					</div>
				</div>
				{ ( isDirtyFields && ! hasErrors ) && (
					<>
						<Fill name="hasSharingFooter">
							<div className="has-admin-save-bar">
								<div className="has-admin__tabs--content-actions">
									<div className="has-admin__tabs--content-actions--left">
										<Button
											variant="primary"
											type="submit"
											text={
												saving
													? __( 'Saving…', 'highlight-and-share' )
													: __( 'Save Settings', 'highlight-and-share' )
											}
											icon={ saving ? Spinner : false }
											iconSize="18"
											iconPosition="right"
											disabled={ saving || resetting }
										/>
									</div>
									<div className="has-admin__tabs--content-actions--right">
										<Button
											variant="secondary"
											type="button"
											text={
												resetting
													? __( 'Discarding Changes…', 'highlight-and-share' )
													: __( 'Discard Changes', 'highlight-and-share' )
											}
											icon={ resetting ? Spinner : false }
											iconSize="18"
											iconPosition="right"
											disabled={ saving || resetting }
											onClick={ ( e ) => {
												//handleReset( e );
											} }
										/>
									</div>
								</div>
							</div>
						</Fill>
					</>
				) }
			</FormProvider>
		</>
	);
};

export default Sharing;
