/**
 * Block Editor Panel Component.
 *
 * Consolidates block editor settings from the Block Editor tab into a single collapsible panel.
 * Includes block settings and Adobe Fonts configuration.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense, useState } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { ToggleControl, TextControl, Button } from '@wordpress/components';
import classNames from 'classnames';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import Notice from '../../../Components/Notice';
import CircularExclamationIcon from '../../../Components/Icons/CircularExplanation';
import Spinner from '../../../Components/Icons/Spinner';
import sendCommand from '../../../Utils/SendCommand';

/**
 * Block Editor Panel Interface Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Block Editor Panel component.
 */
const Interface = ( { watchFields } ) => {
	// Get form methods from FormProvider context.
	const { control, clearErrors, trigger, setValue, setError, getValues, formState: { errors } } = useFormContext();

	// Refresh fonts state.
	const [ refreshingFonts, setRefreshingFonts ] = useState( false );

	// Watch enableAdobeFonts to conditionally show Adobe Fonts settings.
	const enableAdobeFonts = useWatch( {
		control,
		name: 'enableAdobeFonts',
	} );

	// Watch adobeProjectId for font list display.
	const adobeProjectId = useWatch( {
		control,
		name: 'adobeProjectId',
	} );

	// Watch adobeFonts to show font list.
	const adobeFonts = useWatch( {
		control,
		name: 'adobeFonts',
	} );

	/**
	 * Refresh Adobe Fonts.
	 */
	const refreshAdobeFonts = async() => {
		const result = await trigger( 'adobeProjectId' );
		if ( ! result ) {
			return;
		}

		setRefreshingFonts( true );
		sendCommand( 'has_retrieve_remote_adobe_fonts', {
			nonce: window.hasSharingAdmin?.saveNonce,
			project_id: getValues( 'adobeProjectId' ),
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setValue( 'adobeFonts', ajaxData );
				} else {
					const { message } = ajaxData[ 0 ];
					setValue( 'adobeFonts', [] );
					setError( 'adobeProjectId', { type: 'manual', message }, { shouldFocus: true } );
				}
			} )
			.catch( () => {} )
			.finally( () => {
				setRefreshingFonts( false );
			} );
	};

	/**
	 * Get Adobe Fonts list display.
	 *
	 * @return {JSX.Element|null} Font list or null.
	 */
	const getAdobeFontsList = () => {
		if ( errors.adobeProjectId ) {
			return null;
		}
		if ( ! enableAdobeFonts || ! adobeFonts || 0 === adobeFonts.length ) {
			return null;
		}
		return (
			<div className="components-base-control">
				<label
					htmlFor="adobe-font-list"
					className="components-base-control__label"
				>
					{ __( 'Current Adobe Fonts', 'highlight-and-share' ) }
				</label>
				<ul
					className="has-adobe-font-list has-admin-list-ul"
					id="adobe-font-list"
				>
					{ adobeFonts.map( ( font ) => {
						return <li key={ font.slug }>{ font.name }</li>;
					} ) }
				</ul>
			</div>
		);
	};

	return (
		<PanelBodyWithIndicator
			title={ __( 'Block Editor - Click to Share Block Settings', 'highlight-and-share' ) }
			initialOpen={ false }
			panelId="block-editor"
			control={ control }
			className="has-sharing-panel"
			watchFields={ watchFields }
		>
			<div className="has-admin-component-wrapper">
				<h3 className="has-admin-content-subheading">
					{ __( 'Block Settings', 'highlight-and-share' ) }
				</h3>
				<p className="description">
					{ __( 'Set block editor options.', 'highlight-and-share' ) }
				</p>

				<div className="has-admin-component-row">
					<Controller
						name="enableBlocks"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Blocks', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'If you are not using the Click to Share blocks, you can disable this option.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				<h3 className="has-admin-content-subheading">
					{ __( 'Adobe Font Settings', 'highlight-and-share' ) }
				</h3>
				<p className="description">
					{ __( 'Enabling Adobe Fonts will show the fonts in the Block Editor.', 'highlight-and-share' ) }
				</p>

				<div className="has-admin-component-row">
					<Controller
						name="enableAdobeFonts"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Adobe Fonts', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Enable Adobe Fonts in the block editor.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				{ enableAdobeFonts && (
					<>
						<div className="has-admin-component-row">
							<Controller
								name="adobeProjectId"
								control={ control }
								rules={ {
									required: enableAdobeFonts,
									pattern: /^[a-z0-9]+$/i,
								} }
								render={ ( { field: { onChange, value } } ) => (
									<>
										<TextControl
											type="text"
											value={ value || '' }
											onChange={ ( textValue ) => {
												clearErrors( 'adobeProjectId' );
												onChange( textValue );
											} }
											label={ __( 'Adobe Fonts Project ID', 'highlight-and-share' ) }
											className={ classNames(
												'has-admin__text-control',
												{
													'has-error':
														'pattern' === errors.adobeProjectId?.type ||
														'manual' === errors.adobeProjectId?.type ||
														'required' === errors.adobeProjectId?.type,
													'is-required': true,
												}
											) }
											aria-required="true"
											help={ __(
												'Enter the Adobe Project ID of the web project in order to load Adobe Fonts.',
												'highlight-and-share'
											) }
										/>
										{ 'required' === errors.adobeProjectId?.type && (
											<Notice
												message={ __( 'This field is a required field.', 'highlight-and-share' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										{ 'pattern' === errors.adobeProjectId?.type && (
											<Notice
												message={ __(
													'Please use only lowercase letters and numbers.',
													'highlight-and-share'
												) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										{ 'manual' === errors.adobeProjectId?.type && (
											<Notice
												message={ errors.adobeProjectId.message }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										{ getAdobeFontsList() }
									</>
								) }
							/>
						</div>

						{ adobeProjectId && ! errors.adobeProjectId && (
							<div className="has-admin__tabs--content-actions-inline">
								<Button
									className={ classNames(
										'has__btn has__btn-secondary has__btn--icon-right has__btn-accent',
										{ 'has-icon': refreshingFonts },
										{ 'is-saving': refreshingFonts }
									) }
									type="button"
									text={
										refreshingFonts
											? __( 'Getting Fonts…', 'highlight-and-share' )
											: __( 'Refresh Fonts', 'highlight-and-share' )
									}
									icon={ refreshingFonts ? Spinner : false }
									iconSize="18"
									iconPosition="right"
									disabled={ refreshingFonts }
									onClick={ refreshAdobeFonts }
								/>
							</div>
						) }
					</>
				) }
			</div>
		</PanelBodyWithIndicator>
	);
};

/**
 * Block Editor Panel Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Block Editor Panel with error boundary and suspense.
 */
const BlockEditorPanel = ( { watchFields } ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Block Editor panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface watchFields={ watchFields } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default BlockEditorPanel;

