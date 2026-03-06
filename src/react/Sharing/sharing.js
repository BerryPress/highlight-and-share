/**
 * Sharing tab component.
 */

import { __ } from '@wordpress/i18n';
import { useForm, FormProvider, useWatch, useFormState } from 'react-hook-form';
import { Suspense, useEffect, useState, useRef } from 'react';
import { dispatch, select } from '@wordpress/data';
import { Fill } from '@wordpress/components';
import store from './Panels/SocialNetworksPanel/Store'; // Register the store before using components that depend on it.
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
import SaveBar from '../Components/SaveBar';
import Snackbar from '../Components/Snackbar';

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
		sharingPrefix: values.sharingPrefix || '',
		sharingSuffix: values.sharingSuffix || '',

		// Advanced options.
		jsContent: escapeEditableHTML( values.jsContent || '' ),
		elementContent: escapeEditableHTML( values.elementContent || '' ),
		idContent: escapeEditableHTML( values.idContent || '' ),
		wrapperClasses: escapeEditableHTML( values.wrapperClasses || '' ),
		shortlinks: values.shortlinks ?? false,

		// Block Editor options.
		enableBlocks: values?.enableBlocks ?? true,

		// Inline Highlighting options.
		enableInlineHighlighting: values?.enableInlineHighlighting ?? false,
		inlineHighlightBackgroundColor:
			values?.inlineHighlightBackgroundColor || '#ffefb1',
		inlineHighlightBackgroundColorHover:
			values?.inlineHighlightBackgroundColorHover || '#fcd63c',
		inlineHighlightTextColor: values?.inlineHighlightTextColor || '#000000',
		inlineHighlightTextColorHover:
			values?.inlineHighlightTextColorHover || '#000000',
		inlineHighlightTooltipsText: escapeEditableHTML(
			values?.inlineHighlightTooltipsText || ''
		),
		inlineHighlightShowTooltips: values?.inlineHighlightShowTooltips ?? false,
		inlineHighlightTooltipsBackgroundColor:
			values?.inlineHighlightTooltipsBackgroundColor || '#000000',
		inlineHighlightTooltipsTextColor:
			values?.inlineHighlightTooltipsTextColor || '#FFFFFF',

		// Appearance options.
		theme: values.theme ?? 'default',
		networkOrder: values.networkOrder ?? [],
		iconsOnly: values.iconsOnly ?? true,
		orientation: values.orientation ?? 'horizontal',
		showTooltips: values.showTooltips ?? true,
		tooltipsTextColor: values.tooltipsTextColor ?? '#FFFFFF',
		tooltipsBackgroundColor: values.tooltipsBackgroundColor ?? '#000000',
		groupIcons: values.groupIcons ?? true,
		backgroundColor: values.backgroundColor ?? '#000000',
		backgroundColorHover: values.backgroundColorHover ?? '#333333',
		iconColors: values.iconColors ?? [],
		iconColorsGroup: values.iconColorsGroup ?? '#FFFFFF',
		iconColorsGroupHover: values.iconColorsGroupHover ?? '#FFFFFF',
		borderRadiusGroup: values.borderRadiusGroup ?? {
			attrTop: 0,
			attrRight: 0,
			attrBottom: 0,
			attrLeft: 0,
		},
		iconBorderRadius: values.iconBorderRadius ?? {
			attrTop: 0,
			attrRight: 0,
			attrBottom: 0,
			attrLeft: 0,
		},
		fontSize: Number( values.fontSize ) || 14,
		iconPadding: values.iconPadding ?? {
			attrTop: 12,
			attrRight: 20,
			attrBottom: 12,
			attrLeft: 20,
			attrUnit: 'px',
			attrSyncUnits: false,
		},
		iconSize: Number( values.iconSize ) || 25,
		iconGap: values.iconGap ?? 0,

		// Post Types Exclusion.
		excludedPostTypes: values.excludedPostTypes || {},
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
				<p>{ __( 'Could not load Sharing panel.', 'highlight-and-share' ) }</p>
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
	const [ snackbar, setSnackbar ] = useState( {
		isVisible: false,
		message: __( 'Settings saved successfully.', 'highlight-and-share' ),
		title: __( 'Settings saved successfully.', 'highlight-and-share' ),
		type: 'success',
		isDismissable: false,
		isPersistent: false,
		isSuccess: true,
		loadingMessage: null,
		politeness: 'assertive',
	} );
	// Set up global React Hook Form instance for all panels.
	// Default values will be reset when async data loads (in SocialNetworksPanel).
	const methods = useForm( {
		defaultValues: getDefaultValues( {} ), // Start with empty defaults, will be reset when data loads.
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


	/**
	 * Set the checkpoint data.
	 *
	 * @param {Object}  newData         New data.
	 * @param {boolean} keepDirtyValues Whether to keep dirty values.
	 */
	const setCheckpointData = ( newData, keepDirtyValues = true ) => {
		dispatch( store ).setNetworks( newData.socialNetworks );
		dispatch( store ).setSettings( newData.values );
		dispatch( store ).setTheme( newData.values.theme );
		dispatch( store ).setSocialNetworkColors( newData.values.iconColors );
		// Build post types exclusion object.
		Object.keys( hasSharingAdmin.postTypes ).forEach( ( postType ) => {
			// If post type isn't included in object, add it.
			newData.values.excludedPostTypes[ postType ] = newData.values.excludedPostTypes?.[ postType ] || false;
		} );
		methods.reset( getDefaultValues( newData.values ), { keepDirtyValues, keepDirty: keepDirtyValues } );
		dispatch( store ).setCheckpoint( newData );
	};

	// Set the initial form state when data loads.
	useEffect( () => {
		if ( data ) {
			setCheckpointData( data );
		}
	}, [ data, methods ] );

	// Load panel states from user meta only when not already provided on initial page load.
	useEffect( () => {
		if ( window.hasSharingAdmin?.panelStates ) {
			return;
		}
		let isMounted = true;
		sendCommand( 'has_get_admin_user_meta', {
			nonce: window.hasSharingAdmin?.userMetaNonce || '',
		} )
			.then( ( response ) => {
				if ( ! isMounted ) {
					return;
				}
				if ( response?.data?.success && response?.data?.data?.panel_states ) {
					const panelStates = response.data.data.panel_states;
					if ( typeof panelStates === 'object' ) {
						Object.keys( panelStates ).forEach( ( id ) => {
							dispatch( store ).setPanelState( id, !! panelStates[ id ] );
						} );
					}
				}
			} )
			.catch( () => {} );
		return () => {
			isMounted = false;
		};
	}, [] );

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
							<Suspense
								fallback={ <div>{ __( 'Loading…', 'highlight-and-share' ) }</div> }
							>
								<SocialNetworksPanel
									{ ...data }
									watchFields={ socialNetworksPanelWatchValues }
								/>
								<DisplayRulesPanel watchFields={ displayRulesPanelWatchValues } />
								<AppearancesPanel
									{ ...data }
									watchFields={ appearancePanelWatchValues }
								/>
								<PreviewPanel { ...data } />
								<BlockEditorPanel watchFields={ blockEditorPanelWatchValues } />
								<InlineHighlightingPanel
									watchFields={ inlineHighlightingPanelWatchValues }
								/>
								<AdvancedPanel watchFields={ advancedPanelWatchValues } />
							</Suspense>
						</div>
					</div>
				</div>
				<Fill name="hasSharingFooter">
					{
						<Snackbar
							politeness={ snackbar.politeness }
							isVisible={ snackbar.isVisible }
							message={ snackbar.message }
							title={ snackbar.title }
							type={ snackbar.type }
							isDismissable={ snackbar.isDismissable }
							isPersistent={ snackbar.isPersistent }
							isSuccess={ snackbar.isSuccess }
							loadingMessage={ snackbar.loadingMessage }
							onClose={ () => {
								setSnackbar( {
									...snackbar,
									isVisible: false,
								} );
							} }
						>
							{ snackbar.message }
						</Snackbar>
					}
					<SaveBar
						onDiscardChanges={ () => {
							const checkpoint = select( store ).getCheckpoint();
							setCheckpointData( checkpoint, false );
						} }
						onSave={ () => {
							// Save the form data (getValues() ensures current state at click time, including conditionally visible fields like fontSize).
							setSaving( true );
							sendCommand( 'has_save_settings_tab', {
								nonce: window.hasSharingAdmin?.saveNonce,
								form_data: methods.getValues(),
							} )
								.then( ( ajaxResponse ) => {
									const { data: ajaxData, success } = ajaxResponse.data;
									if ( success ) {
										setCheckpointData( ajaxData, false );
										// Wait 350ms so animation can hide.
										setTimeout( () => {
											setSnackbar( {
												isVisible: true,
												message: __(
													'Settings saved successfully.',
													'highlight-and-share'
												),
												title: __(
													'Settings saved successfully.',
													'highlight-and-share'
												),
												type: 'success',
												isDismissable: true,
												isPersistent: false,
												isSuccess: true,
												loadingMessage: null,
												politeness: 'assertive',
											} );
										}, 350 );
										setSaving( false );
									} else {
										// Error stuff.
										setSaving( false );
									}
								} )
								.catch( ( error ) => {
									console.error( error );
									setSaving( false );
								} );
						} }
						onReset={ () => {
							// Reset the form data.
							setResetting( true );
							sendCommand( 'has_reset_settings_tab', {
								nonce: window.hasSharingAdmin?.resetNonce,
							} )
								.then( ( ajaxResponse ) => {
									const { data: ajaxData, success } = ajaxResponse.data;
									if ( success ) {
										setCheckpointData( ajaxData, false );
										// Wait 350ms so animation can hide.
										setTimeout( () => {
											setSnackbar( {
												isVisible: true,
												message: __(
													'Settings reset to defaults successfully.',
													'highlight-and-share'
												),
												title: __(
													'Settings reset to defaults successfully.',
													'highlight-and-share'
												),
												type: 'success',
												isDismissable: true,
												isPersistent: false,
												isSuccess: true,
												loadingMessage: null,
												politeness: 'assertive',
											} );
										}, 350 );
										setResetting( false );
									} else {
										// Error stuff.
										setResetting( false );
									}
								} )
								.catch( ( error ) => {
									console.error( error );
									setResetting( false );
								} );
						} }
						isSaving={ saving }
						isResetting={ resetting }
						isDirtyFields={ isDirtyFields }
						hasErrors={ hasErrors }
					/>
				</Fill>
			</FormProvider>
		</>
	);
};

export default Sharing;
