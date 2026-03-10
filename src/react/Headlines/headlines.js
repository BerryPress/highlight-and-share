/**
 * Headlines tab component.
 */

import { useState, Suspense, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useForm, FormProvider, useWatch, useFormState } from 'react-hook-form';
import { useAsyncResource } from 'use-async-resource';
import { dispatch } from '@wordpress/data';
import { Fill } from '@wordpress/components';
import ErrorBoundary from '../Components/ErrorBoundary';
import Loader from '../Components/Loader';
import sendCommand from '../Utils/SendCommand';
import SaveBar from '../Components/SaveBar';
import Snackbar from '../Components/Snackbar';
import store from '../Sharing/Panels/SocialNetworksPanel/Store';
import SocialNetworksPanel from './Panels/SocialNetworksPanel';
import HeadlinesPanel from './Panels/HeadlinesPanel';
import AppearancePanel from './Panels/AppearancePanel';
import Notice from '../Components/Notice';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import { addQueryArgs } from '@wordpress/url';

const retrieveDefaults = () => {
	return sendCommand( 'has_load_headlines_tab', {
		nonce: window.hasHeadlinesAdmin?.loadNonce,
	} );
};

let checkpointData = null;
const setCheckpointData = ( newData ) => {
	checkpointData = newData;
};
const getCheckpointData = () => checkpointData;

/**
 * Build default form values from API response.
 *
 * @param {Object} values Values from PHP.
 * @return {Object} Default form values.
 */
const getDefaultValues = ( values = {} ) => ( {
	enableHeadlines: values.enableHeadlines ?? false,
	autoGenerateIds: values.autoGenerateIds ?? false,
	linkIconAlwaysVisible: values.linkIconAlwaysVisible ?? false,
	enabledHeadingLevels: values.enabledHeadingLevels ?? [ 'h2', 'h3', 'h4' ],
	supportedPostTypes: values.supportedPostTypes ?? { post: true },
	exclusionSelectors: values.exclusionSelectors ?? '',
	socialDefaults: values.socialDefaults ?? {},
	networkOrder: values.networkOrder ?? [],
	headlinePlacement: values.headlinePlacement ?? 'before',
	headlinePosition: values.headlinePosition ?? 'inline',
} );

const Headlines = () => {
	const [ defaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>{ __( 'Could not load Headlines options.', 'highlight-and-share' ) }</p>
			}
		>
			<Suspense
				fallback={
					<Loader
						title={ __( 'Headlines', 'highlight-and-share' ) }
						label={ __( 'Loading…', 'highlight-and-share' ) }
						color="var(--wp-admin-theme-color)"
					/>
				}
			>
				<HeadlinesInterface defaults={ defaults } />
			</Suspense>
		</ErrorBoundary>
	);
};

const HeadlinesInterface = ( { defaults } ) => {
	const response = defaults();
	const { data: responseData, success } = response.data;
	const data = responseData?.values ?? responseData ?? {};

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

	const methods = useForm( {
		defaultValues: getDefaultValues( data ),
		mode: 'onBlur',
		resetOptions: { keepDirtyValues: false, keepErrors: false },
	} );

	const { control, reset, getValues } = methods;
	const formValues = useWatch( { control } );
	const { errors, isDirty } = useFormState( { control } );
	const hasErrors = Object.keys( errors ).length > 0;

	const setCheckpoint = ( newData, keepDirty = false ) => {
		const values = newData?.values ?? newData ?? {};
		setCheckpointData( values );
		reset( getDefaultValues( values ), { keepDirtyValues: keepDirty, keepDirty } );
	};

	useEffect( () => {
		if ( success && data ) {
			const values = data.values ?? data;
			setCheckpointData( values );
			reset( getDefaultValues( values ), {
				keepDirtyValues: false,
				keepDirty: false,
			} );
		}
	}, [ success, data, reset ] );

	// Hydrate panel open/close state from user meta (Headlines tab loads without Sharing bundle, so store is registered here).
	useEffect( () => {
		if ( window.hasHeadlinesAdmin?.panelStates ) {
			const panelStates = window.hasHeadlinesAdmin.panelStates;
			if ( typeof panelStates === 'object' ) {
				Object.keys( panelStates ).forEach( ( id ) => {
					dispatch( store ).setPanelState( id, !! panelStates[ id ] );
				} );
			}
			return;
		}
		let isMounted = true;
		sendCommand( 'has_get_admin_user_meta', {
			nonce: window.hasHeadlinesAdmin?.userMetaNonce || '',
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

	if ( ! success ) {
		return <p>{ __( 'Loading…', 'highlight-and-share' ) }</p>;
	}

	return (
		<>
			<FormProvider { ...methods }>
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-heading">
							<h1>
								<span className="has-admin-content-heading-text">
									{ __( 'Headlines', 'highlight-and-share' ) }
								</span>
							</h1>
							<p className="description">
								{ __(
									'Configure share buttons for headings. When enabled, a link icon will appear next to each heading, which will display share buttons when clicked.',
									'highlight-and-share'
								) }
							</p>
							<div className="has-admin-component-row">
								<Notice status="warning" icon={ CircularExclamationIcon }>
									<p className="has-admin__notice-message-content">
										{ __(
											'Headline Sharing is currently experimental and may not work with all themes. Please ensure your site layout is not affected after enabling headline sharing.',
											'highlight-and-share'
										) }{ ' ' }
										<a
											href={ addQueryArgs( 'https://dlxplugins.com/support/', {
												product: 'Highlight and Share',
												firstname: hasHeadlinesAdmin.supportParams.firstName,
												lastname: hasHeadlinesAdmin.supportParams.lastName,
												email: hasHeadlinesAdmin.supportParams.email,
												subject: `[Highlight and Share] Headline Sharing Issue With Theme: ${ hasHeadlinesAdmin.supportParams.theme }`,
												site: hasHeadlinesAdmin.supportParams.siteUrl,
											} ) }
											target="_blank"
											rel="noopener noreferrer"
										>
											{ __(
												'Please Contact Support for Help.',
												'highlight-and-share'
											) }
										</a>
									</p>
								</Notice>
							</div>
						</div>
						<div className="has-admin-content-body">
							<HeadlinesPanel />
							<SocialNetworksPanel />
							<AppearancePanel />
						</div>
					</div>
				</div>
				<Fill name="hasHeadlinesFooter">
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
						onClose={ () => setSnackbar( { ...snackbar, isVisible: false } ) }
					>
						{ snackbar.message }
					</Snackbar>
					<SaveBar
						onDiscardChanges={ () => {
							const checkpoint = getCheckpointData();
							setCheckpoint( checkpoint, false );
						} }
						onSave={ () => {
							setSaving( true );
							// Use getValues() at save time so we always send current form state (useWatch can be stale in Fill).
							const payload = getValues();
							sendCommand( 'has_save_headlines_tab', {
								nonce: window.hasHeadlinesAdmin?.saveNonce,
								form_data: payload,
							} )
								.then( ( ajaxResponse ) => {
									const { data: ajaxData, success: ok } = ajaxResponse.data;
									if ( ok ) {
										const values = ajaxData?.values ?? ajaxData ?? {};
										setCheckpoint( values, false );
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
									}
									setSaving( false );
								} )
								.catch( () => {
									setSaving( false );
								} );
						} }
						onReset={ () => {
							setResetting( true );
							sendCommand( 'has_reset_headlines_tab', {
								nonce: window.hasHeadlinesAdmin?.resetNonce,
							} )
								.then( ( ajaxResponse ) => {
									const { data: ajaxData, success: ok } = ajaxResponse.data;
									if ( ok ) {
										const values = ajaxData?.values ?? ajaxData ?? {};
										setCheckpoint( values, false );
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
									}
									setResetting( false );
								} )
								.catch( () => {
									setResetting( false );
								} );
						} }
						isSaving={ saving }
						isResetting={ resetting }
						isDirtyFields={ isDirty }
						hasErrors={ hasErrors }
					/>
				</Fill>
			</FormProvider>
		</>
	);
};

export default Headlines;
