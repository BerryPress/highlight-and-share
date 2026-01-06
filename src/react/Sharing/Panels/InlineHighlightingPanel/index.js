/**
 * Inline Highlighting Panel Component.
 *
 * Consolidates inline highlighting settings from the Block Editor tab into a single collapsible panel.
 * Includes color customization, tooltip settings, and preview.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { ToggleControl, TextControl } from '@wordpress/components';
import classNames from 'classnames';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import Notice from '../../../Components/Notice';
import CircularInfoIcon from '../../../Components/Icons/CircularInfo';
import CircularExclamationIcon from '../../../Components/Icons/CircularExplanation';
import HASColorPicker from '../../../Components/ColorPicker';

/**
 * Inline Highlighting Panel Interface Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Inline Highlighting Panel component.
 */
const Interface = ( { watchFields } ) => {
	// Get form methods from FormProvider context.
	const { control, formState: { errors } } = useFormContext();

	// Watch enableInlineHighlighting to conditionally show settings.
	const enableInlineHighlighting = useWatch( {
		control,
		name: 'enableInlineHighlighting',
	} );

	// Watch inlineHighlightShowTooltips to conditionally show tooltip settings.
	const inlineHighlightShowTooltips = useWatch( {
		control,
		name: 'inlineHighlightShowTooltips',
	} );

	// Watch form values for preview.
	const formValues = useWatch( {
		control,
	} );

	// Get colors from localization.
	const inlineHighlightColors = [
		{
			label: __( 'Inline Background Color Default', 'highlight-and-share' ),
			color: '#ffefb1',
			slug: 'inline-highlight-background-color',
		},
		{
			label: __( 'Inline Background Color Hover Default', 'highlight-and-share' ),
			color: '#fcd63c',
			slug: 'inline-highlight-background-color-hover',
		},
		{
			label: __( 'Inline Text Color Default', 'highlight-and-share' ),
			color: '#000000',
			slug: 'inline-highlight-text-color',
		},
		{
			label: __( 'White', 'highlight-and-share' ),
			color: '#FFFFFF',
			slug: 'inline-highlight-color-white',
		},
		...( window.hasSharingAdmin?.colors || [] ),
	];

	/**
	 * Get inline highlighting color options.
	 *
	 * @return {JSX.Element|null} Color options or null.
	 */
	const getInlineHighlightingColorOptions = () => {
		if ( ! enableInlineHighlighting ) {
			return null;
		}

		const styles = {
			color: formValues.inlineHighlightTextColor,
			backgroundColor: formValues.inlineHighlightBackgroundColor,
		};
		const hoverStyles = `
			.has-inline-text:hover {
				color: ${ formValues.inlineHighlightTextColorHover } !important;
				background-color: ${ formValues.inlineHighlightBackgroundColorHover } !important;
			}`;

		return (
			<>
				<style>{ hoverStyles }</style>
				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightBackgroundColor"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Background Color', 'highlight-and-share' ) }
								defaultColors={ inlineHighlightColors }
								defaultColor={ '#ffefb1' }
								slug={ 'background_color' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightBackgroundColorHover"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Background Color Hover', 'highlight-and-share' ) }
								defaultColors={ inlineHighlightColors }
								defaultColor={ '#fcd63c' }
								slug={ 'background_color_hover' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightTextColor"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Text Color', 'highlight-and-share' ) }
								defaultColors={ inlineHighlightColors }
								defaultColor={ '#000000' }
								slug={ 'text_color' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightTextColorHover"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Text Color Hover', 'highlight-and-share' ) }
								defaultColors={ inlineHighlightColors }
								defaultColor={ '#000000' }
								slug={ 'text_color_hover' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<h4>{ __( 'Inline Highlighting Preview:', 'highlight-and-share' ) }</h4>
					<p>
						Lorem ipsum dolor sit amet, <span className="has-inline-text" style={ styles }>consectetur adipiscing elit. Morbi ut lacinia augue</span>. Nam convallis lacus at ex fringilla, a venenatis mi facilisis. Sed lobortis pharetra massa, sit amet dictum erat egestas in.
					</p>
				</div>
			</>
		);
	};

	/**
	 * Get inline highlighting tooltip color options.
	 *
	 * @return {JSX.Element|null} Tooltip color options or null.
	 */
	const getInlineHighlightingTooltipColorOptions = () => {
		if ( ! inlineHighlightShowTooltips ) {
			return null;
		}

		return (
			<>
				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightTooltipsTextColor"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Tooltip Text Color', 'highlight-and-share' ) }
								defaultColors={ inlineHighlightColors }
								defaultColor={ '#FFFFFF' }
								slug={ 'tooltip_text_color' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightTooltipsBackgroundColor"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
								} }
								label={ __( 'Tooltip Background Color', 'highlight-and-share' ) }
								defaultColors={ inlineHighlightColors }
								defaultColor={ '#000000' }
								slug={ 'tooltip_background_color' }
							/>
						) }
					/>
				</div>
			</>
		);
	};

	/**
	 * Get inline highlighting tooltips text field.
	 *
	 * @return {JSX.Element|null} Tooltip text field or null.
	 */
	const getInlineHighlightingTooltipsText = () => {
		if ( ! inlineHighlightShowTooltips ) {
			return null;
		}

		return (
			<div className="has-admin-component-row">
				<Controller
					name="inlineHighlightTooltipsText"
					control={ control }
					rules={ {
						required: inlineHighlightShowTooltips,
					} }
					render={ ( { field } ) => (
						<>
							<TextControl
								{ ...field }
								type="text"
								label={ __( 'Tooltip Text', 'highlight-and-share' ) }
								className={ classNames( 'has-admin__text-control', {
									'is-required': true,
									'has-error': 'required' === errors.inlineHighlightTooltipsText?.type,
								} ) }
								help={ __(
									'Add a tooltip that will show when a highlight is hovered.',
									'highlight-and-share'
								) }
							/>
							{ 'required' === errors.inlineHighlightTooltipsText?.type && (
								<Notice
									message={ __( 'This field is required.', 'highlight-and-share' ) }
									status="error"
									politeness="assertive"
									inline={ true }
									icon={ CircularExclamationIcon }
								/>
							) }
						</>
					) }
				/>
			</div>
		);
	};

	return (
		<PanelBodyWithIndicator
			title={ __( 'Inline Highlighting - Colors and Tooltips', 'highlight-and-share' ) }
			initialOpen={ false }
			panelId="inline-highlighting"
			control={ control }
			className="has-sharing-panel"
			watchFields={ watchFields }
		>
			<div className="has-admin-component-wrapper">
				<p className="description">
					{ __( 'Set inline highlighting behavior and colors.', 'highlight-and-share' ) }
				</p>

				<Notice
					message={ __(
						'Inline highlighting is enabled by using the formatting options in the Block Editor or by wrapping the text with the [has-inline-text] CSS class.',
						'highlight-and-share'
					) }
					status="info"
					politeness="polite"
					inline={ false }
					icon={ CircularInfoIcon }
				/>

				<div className="has-admin-component-row">
					<Controller
						name="enableInlineHighlighting"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Inline Highlighting', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Disabling this option will disable inline highlighting throughout the site.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				{ getInlineHighlightingColorOptions() }

				<div className="has-admin-component-row">
					<Controller
						name="inlineHighlightShowTooltips"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Inline Highlighting Tooltips', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Hovering over a highlight will reveal a helpful tooltip.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				{ getInlineHighlightingTooltipsText() }
				{ getInlineHighlightingTooltipColorOptions() }
			</div>
		</PanelBodyWithIndicator>
	);
};

/**
 * Inline Highlighting Panel Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Inline Highlighting Panel with error boundary and suspense.
 */
const InlineHighlightingPanel = ( { watchFields } ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Inline Highlighting panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface watchFields={ watchFields } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default InlineHighlightingPanel;

