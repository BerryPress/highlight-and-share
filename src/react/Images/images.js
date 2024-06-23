import React, { useState, lazy, Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { escapeEditableHTML } from '@wordpress/escape-html';

import {
	TextControl,
	Button,
	ToggleControl,
	CheckboxControl,
	BaseControl,
	SelectControl,
} from '@wordpress/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faShare as ShareIcon } from '@fortawesome/free-solid-svg-icons/faShare';
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularInfoIcon from '../Components/Icons/CircularInfo';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Spinner from '../Components/Icons/Spinner';
import sendCommand from '../Utils/SendCommand';
import Loader from '../Components/Loader';
import HASColorPicker from '../Components/ColorPicker';

const selectLocations = [
	{ value: 'top-left', label: __( 'Top Left', 'highlight-and-share' ) },
	{ value: 'top-right', label: __( 'Top Right', 'highlight-and-share' ) },
	{ value: 'bottom-left', label: __( 'Bottom Left', 'highlight-and-share' ) },
	{ value: 'bottom-right', label: __( 'Bottom Right', 'highlight-and-share' ) },
	{ value: 'center-center', label: __( 'Center', 'highlight-and-share' ) },
];
const selectButtonAppearance = [
	{ value: 'square', label: __( 'Square', 'highlight-and-share' ) },
	{ value: 'round', label: __( 'Rounded', 'highlight-and-share' ) },
	{ value: 'circle', label: __( 'Circle', 'highlight-and-share' ) },
];
const defaultColors = hasImagesAdmin.defaultColors;
const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_images_options', {
		nonce: hasImagesAdmin.retrieveNonce,
	} );
};

const Images = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Image Sharing options.', 'highlight-and-share' ) }
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
					<div className="has-admin-container-body__content">
						<Loader
							title={ __( 'Image Sharing Settings', 'highlight-and-share' ) }
							label={ __( 'Loading…', 'highlight-and-share' ) }
							color="var(--wp-admin-theme-color)"
						/>
					</div>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const Preview = ( props ) => {
	const {
		formValues,
	} = props;

	const classes = classNames(
		'has-pin-sharing-icons',
		{
			'has-icon-label': formValues.showButtonLabels,
			'has-appearance-round': 'round' === formValues.buttonShape,
			'has-appearance-circle': 'circle' === formValues.buttonShape,
			'has-appearance-square': 'square' === formValues.buttonShape,
		}
	);

	const imageWrapperClasses = classNames(
		'has-admin-pinterest-preview',
		'has-pin-image-wrapper',
		{
			'has-pin-top-left': 'top-left' === formValues.location,
			'has-pin-top-right': 'top-right' === formValues.location,
			'has-pin-bottom-left': 'bottom-left' === formValues.location,
			'has-pin-bottom-right': 'bottom-right' === formValues.location,
			'has-pin-center-center': 'center-center' === formValues.location,
			'has-pin-show-on-hover': formValues.showOnHover,
		}
	);

	const styles = `
		.has-admin-pinterest-preview .has-pin-svg-pinterest {
			--has-pinterest-button-color: ${ formValues.pinterestButtonColor };
			--has-pinterest-button-color-hover: ${ formValues.pinterestButtonColorHover };
			--has-pinterest-icon-color: ${ formValues.pinterestIconColor };
			--has-pinterest-icon-color-hover: ${ formValues.pinterestIconColorHover };
			--has-pinterest-text-color: ${ formValues.pinterestTextColor };
			--has-pinterest-text-color-hover: ${ formValues.pinterestTextColorHover };
		}
		.has-admin-pinterest-preview .has-pin-svg-webshare {
			--has-webshare-icon-color: ${ formValues.webshareIconColor };
			--has-webshare-icon-color-hover: ${ formValues.webshareIconColorHover };
			--has-webshare-button-color: ${ formValues.webshareButtonColor };
			--has-webshare-button-color-hover: ${ formValues.webshareButtonColorHover };
			--has-webshare-text-color: ${ formValues.webshareTextColor };
			--has-webshare-text-color-hover: ${ formValues.webshareTextColorHover };
		}
	`;

	let previewLabel = __( 'Preview', 'highlight-and-share' );
	if ( formValues.showOnHover ) {
		previewLabel = __( 'Preview: Hover to Preview', 'highlight-and-share' );
	}

	return (
		<BaseControl
			id="preview"
			label={ previewLabel }
		>
			<style>{ styles }</style>
			<div className={ imageWrapperClasses }>
				<div className={ classes }>
					{ formValues.enablePinterestSharing && (
						<span className="has-pin-svg-pinterest has-pin-button">
							<FontAwesomeIcon icon={ faPinterest } />
							{
								formValues.showButtonLabels && (
									<span className="has-icon-label">
										{ formValues.pinterestButtonLabel }
									</span>
								)
							}
						</span>
					) }
					{
						formValues.enableWebshareSharing && (
							<span className="has-pin-svg-webshare has-pin-button">
								<FontAwesomeIcon icon={ ShareIcon } />
								{
									formValues.showButtonLabels && (
										<span className="has-icon-label">
											{ formValues.webshareButtonLabel }
										</span>
									)
								}
							</span>
						)
					}
				</div>
			</div>
		</BaseControl>
	);
};

const Interface = ( props ) => {
	// Get retrieved data.
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ refreshingFonts, setRefreshingFonts ] = useState( false );

	const getDefaultValues = () => {
		return {
			enableImageSharing: data.enableImageSharing,
			enablePinterestSharing: data.enablePinterestSharing,
			enableWebshareSharing: data.enableWebshareSharing,
			excludeLeadingImage: data.excludeLeadingImage,
			supportedPostTypes: data.supportedPostTypes,
			location: data.location,
			showOnHover: data.showOnHover,
			pinterestButtonColor: data.pinterestButtonColor,
			pinterestButtonColorHover: data.pinterestButtonColorHover,
			pinterestIconColor: data.pinterestIconColor,
			pinterestIconColorHover: data.pinterestIconColorHover,
			pinterestTextColor: data.pinterestTextColor,
			pinterestTextColorHover: data.pinterestTextColorHover,
			webshareIconColor: data.webshareIconColor,
			webshareIconColorHover: data.webshareIconColorHover,
			webshareButtonColor: data.webshareButtonColor,
			webshareButtonColorHover: data.webshareButtonColorHover,
			webshareTextColor: data.webshareTextColor,
			webshareTextColorHover: data.webshareTextColorHover,
			buttonShape: data.buttonShape,
			showButtonLabels: data.showButtonLabels,
			pinterestButtonLabel: data.pinterestButtonLabel,
			webshareButtonLabel: data.webshareButtonLabel,
			webshareShareImageOnly: data.webshareShareImageOnly,
			exclusions: data.exclusions,
		};
	};
	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		trigger,
		setError,
		clearErrors,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setSaving( true );

		sendCommand( 'has_save_images_options', {
			nonce: hasImagesAdmin.saveNonce,
			formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Reset count.
					reset( ajaxData );
					setIsSaved( true );
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					const { message } = ajaxData[ 0 ];
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};
	const handleReset = ( e ) => {
		setResetting( true );
		sendCommand( 'has_reset_images_options', {
			nonce: hasImagesAdmin.resetNonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Clear form dirty.
					reset( ajaxData );

					setIsReset( true );
					setTimeout( () => {
						setIsReset( false );
					}, 3000 );
				} else {
					// Error stuff.
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setResetting( false );
			} );
	};
	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	return (
		<>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-admin-container-body__content">
					<div className="has-admin-content-wrapper">
						<div className="has-admin-content-panel">
							<div className="has-admin-content-heading">
								<h1>
									<span className="has-admin-content-heading-text">
										{ __( 'Image Sharing Settings', 'highlight-and-share' ) }
									</span>
								</h1>
								<p className="description">
									{ __(
										'On this screen, you can set the image sharing options for Pinterest and the Web Share API.',
										'highlight-and-share'
									) }
								</p>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Image Sharing', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Set image sharing options.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Notice
										status="warning"
										icon={ CircularExclamationIcon }
										message={ __(
											'Image sharing is still new and may not be compatible with all themes. Please ensure your site layout is not affected after enabling image sharing.',
											'highlight-and-share'
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="enableImageSharing"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Image Sharing',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable or disable image sharing on your images.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="enablePinterestSharing"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Pinterest Sharing',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable or disable Pinterest sharing on images.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="enableWebshareSharing"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Web Share Sharing (Mobile Only)',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable or disable the Web Share API sharing on mobile devices.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{
									formValues.enableWebshareSharing && (
										<div className="has-admin-component-row">
											<Controller
												name="webshareShareImageOnly"
												control={ control }
												render={ ( { field: { onChange, value } } ) => (
													<ToggleControl
														label={ __(
															'Share Image Only via Web Share',
															'highlight-and-share'
														) }
														className="has-admin__toggle-control"
														checked={ value }
														onChange={ ( boolValue ) => {
															onChange( boolValue );
														} }
														help={ __(
															'By default, the page URL and image file are shared. Enable this to share the image only, which will allow for local copying and saving on mobile devices.',
															'highlight-and-share'
														) }
													/>
												) }
											/>
										</div>
									)
								}
								<div className="has-admin-component-row">
									<Controller
										name="excludeLeadingImage"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Exclude Leading Image',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Exclude the leading image from the image sharing options.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<BaseControl
										id="supportedPostTypes"
										label={ __( 'Supported Post Types', 'highlight-and-share' ) }
										help={ __(
											'Select the post types where image sharing will be enabled.',
											'highlight-and-share'
										) }
									>
										{
											Object.values( hasImagesAdmin.postTypes ).map( ( postType ) => (
												<Controller
													key={ postType.value }
													name={ `supportedPostTypes[${ postType.value }]` }
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<CheckboxControl
															label={ postType.label }
															checked={ value }
															value={ postType.value }
															onChange={ ( newValue ) => {
																onChange( newValue );
															} }
														/>
													) }
												/>
											) )
										}
									</BaseControl>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="exclusions"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Exclusions', 'highlight-and-share' ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												className={ classNames( 'has-admin__text-control' ) }
												help={ __(
													'Enter comma-separated keywords to exclude certain images, such as a CSS classname or data parameter.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Sharing Appearance', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Adjust the appearance of the image sharing options below.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Preview
										formValues={ formValues }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="location"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<SelectControl
												label={ __( 'Location', 'highlight-and-share' ) }
												value={ value }
												options={ selectLocations }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'Select the location where the sharing buttons will appear on the image.',
													'highlight-and-share'
												) }
												className="has-admin__theme-select"
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="showOnHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Show on Hover',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Show the sharing buttons on hover over the image.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="showButtonLabels"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Show Button Labels',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Show the button labels on the sharing buttons.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{
									formValues.showButtonLabels && (
										<>
											<div className="has-admin-component-row">
												<Controller
													name="pinterestButtonLabel"
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<TextControl
															label={ __( 'Pinterest Button Label', 'highlight-and-share' ) }
															value={ value }
															onChange={ ( newValue ) => {
																onChange( newValue );
															} }
															className={ classNames( 'has-admin__text-control' ) }
															help={ __(
																'Enter the label for the Pinterest sharing button.',
																'highlight-and-share'
															) }
														/>
													) }
												/>
											</div>
											<div className="has-admin-component-row">
												<Controller
													name="webshareButtonLabel"
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<TextControl
															label={ __( 'Web Share Button Label', 'highlight-and-share' ) }
															value={ value }
															className={ classNames( 'has-admin__text-control' ) }
															onChange={ ( newValue ) => {
																onChange( newValue );
															} }
															help={ __(
																'Enter the label for the Web Share API sharing button.',
																'highlight-and-share'
															) }
														/>
													) }
												/>
											</div>
										</>
									)
								}
								<div className="has-admin-component-row">
									<Controller
										name="buttonShape"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<SelectControl
												label={ __( 'Button Shape', 'highlight-and-share' ) }
												value={ value }
												options={ selectButtonAppearance }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'Select the shape of the sharing buttons.',
													'highlight-and-share'
												) }
												className="has-admin__theme-select"
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Preview
										formValues={ formValues }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="pinterestButtonColor"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Pinterest Button Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#E7011D' }
												slug={ 'pinterest_button_background_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="pinterestButtonColorHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Pinterest Button Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#BE0319' }
												slug={ 'pinterest_button_background_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="pinterestIconColor"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Pinterest Icon Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#FFFFFF' }
												slug={ 'pinterest_icon_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="pinterestIconColorHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Pinterest Icon Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#FFFFFF' }
												slug={ 'pinterest_icon_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="pinterestTextColor"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Pinterest Text Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#FFFFFF' }
												slug={ 'pinterest_text_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="pinterestTextColorHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Pinterest Text Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#FFFFFF' }
												slug={ 'pinterest_text_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Preview
										formValues={ formValues }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="webshareIconColor"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Web Share Icon Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'webshare_icon_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="webshareIconColorHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Web Share Icon Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'webshare_icon_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="webshareButtonColor"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Web Share Button Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'webshare_button_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="webshareButtonColorHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Web Share Button Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'webshare_button_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="webshareTextColor"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Web Share Text Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'webshare_text_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="webshareTextColorHover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Web Share Text Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'webshare_text_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Preview
										formValues={ formValues }
									/>
								</div>
							</div>
						</div>
						<div className="has-admin__tabs--content-actions">
							<div className="has-admin__tabs--content-actions--left">
								<Button
									className={ classNames(
										'has__btn has__btn-primary has__btn--icon-right',
										{ 'has-error': hasErrors() },
										{ 'has-icon': saving },
										{ 'is-saving': { saving } }
									) }
									type="submit"
									text={
										saving
											? __( 'Saving…', 'highlight-and-share' )
											: __( 'Save Image Sharing Options', 'highlight-and-share' )
									}
									icon={ saving ? Spinner : false }
									iconSize="18"
									iconPosition="right"
									disabled={ saving || resetting }
								/>
							</div>
							<div className="has-admin__tabs--content-actions--right">
								<Button
									className={ classNames(
										'has__btn has__btn-danger has__btn--icon-right',
										{ 'has-icon': resetting },
										{ 'is-resetting': { resetting } }
									) }
									type="button"
									text={
										resetting
											? __( 'Resetting…', 'highlight-and-share' )
											: __( 'Reset Image Settings', 'highlight-and-share' )
									}
									icon={ resetting ? Spinner : false }
									iconSize="18"
									iconPosition="right"
									disabled={ saving || resetting }
									onClick={ ( e ) => {
										setResetting( true );
										handleReset( e );
									} }
								/>
							</div>
						</div>
						{ hasErrors() && (
							<Notice
								message={ __(
									'There are form validation errors. Please correct them above.', 'highlight-and-share'
								) }
								status="error"
								politeness="polite"
							/>
						) }
						{ isSaved && (
							<Notice
								message={ __( 'Your settings have been saved.', 'highlight-and-share' ) }
								status="success"
								politeness="assertive"
							/>
						) }
						{ isReset && (
							<Notice
								message={ __( 'Your settings have been reset to defaults.', 'highlight-and-share' ) }
								status="success"
								politeness="assertive"
							/>
						) }
					</div>
				</div>
			</form>
		</>
	);
};

export default Images;
