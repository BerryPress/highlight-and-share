/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */

/**
 * External dependencies
 */

import { __ } from '@wordpress/i18n';
import { Controller, useForm } from 'react-hook-form';
import HASColorPicker from '../../ColorPicker';

const defaultColors = hasSharingAdmin.colors;

/**
 * Tab Color Pickers component.
 *
 * @param {Object}   props                      Props.
 * @param {Object}   props.backgroundColor      Background color.
 * @param {Object}   props.backgroundColorHover Background color hover.
 * @param {Object}   props.iconColor            Icon color.
 * @param {Object}   props.iconColorHover       Icon color hover.
 * @param {Function} props.onValueChange        On value change.
 * @return {JSX.Element} The Tab Color Pickers component.
 */
const TabColorPickers = ( props ) => {
	// Use another instance of useForm to avoid conflicts with the parent form.
	const { control, getValues } = useForm( {
		defaultValues: {
			backgroundColor: props.backgroundColor,
			backgroundColorHover: props.backgroundColorHover,
			iconColor: props.iconColor,
			iconColorHover: props.iconColorHover,
		},
	} );

	return (
		<form>
			<div className="has-tab-color-picker-wrapper">
				<div className="has-admin-component-row">
					<Controller
						name="backgroundColor"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
									props.onValueChange( getValues() );
								} }
								label={ __( 'Background Color', 'highlight-and-share' ) }
								defaultColors={ defaultColors }
								defaultColor={ getValues( 'backgroundColor' ) }
								slug={ 'backgroundColor' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="backgroundColorHover"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
									props.onValueChange( getValues() );
								} }
								label={ __( 'Background Color Hover', 'highlight-and-share' ) }
								defaultColors={ defaultColors }
								defaultColor={ getValues( 'backgroundColorHover' ) }
								slug={ 'backgroundColorHover' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="iconColor"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
									props.onValueChange( getValues() );
								} }
								label={ __( 'Icon Color', 'highlight-and-share' ) }
								defaultColors={ defaultColors }
								defaultColor={ getValues( 'iconColor' ) }
								slug={ 'iconColor' }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="iconColorHover"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<HASColorPicker
								value={ value }
								onChange={ ( slug, newValue ) => {
									onChange( newValue );
									props.onValueChange( getValues() );
								} }
								label={ __( 'Icon Color Hover', 'highlight-and-share' ) }
								defaultColors={ defaultColors }
								defaultColor={ getValues( 'iconColorHover' ) }
								slug={ 'iconColorHover' }
							/>
						) }
					/>
				</div>
			</div>
		</form>
	);
};

export default TabColorPickers;
