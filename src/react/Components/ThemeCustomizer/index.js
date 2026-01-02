import React, { useEffect, useState } from 'react';
import {
	SelectControl,
	ToggleControl,
	RadioControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useForm, Controller, useWatch, useFormContext } from 'react-hook-form';
import store from '../../Sharing/Store';
import classNames from 'classnames';
import Notice from '../Notice';
import CircularInfoIcon from '../Icons/CircularInfo';
import HASColorPicker from '../ColorPicker';
import DimensionsControl from '../Dimensions';
import SocialNetworkColorsTabs from '../SocialNetworkColorsTabs';
import Spinner from '../Icons/Spinner';
import sendCommand from '../../Utils/SendCommand';

const defaultColors = hasSharingAdmin.colors;

const ThemeCustomizer = () => {
	const { control, formValues, getValues } = useFormContext();
	const {
		theme,
		themeData,
		socialNetworkColors,
	} = useSelect( ( select ) => {
		return {
			theme: select( store ).getTheme(),
			themeData: select( store ).getThemeData(),
			socialNetworkColors: select( store ).getSocialNetworkColors(),
		};
	}, [] );
	const {
		setTheme,
		setThemeData,
		setSocialNetworkColors,
	} = useDispatch( store );

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );

	// const onSubmit = ( formData ) => {
	// 	const iconColors = { icon_colors: socialNetworkColors };
	// 	setSaving( true );
	// 	sendCommand( 'has_save_appearance_settings', {
	// 		formData: { ...formData, ...iconColors },
	// 		nonce: hasSettingsAdmin.saveNonce,
	// 	} ).then( ( response ) => {
	// 		const { data, success } = response.data;
	// 		if ( success ) {
	// 			setAppearanceThemeData( data );
	// 			setIsSaved( true );
	// 			setTimeout( () => {
	// 				setIsSaved( false );
	// 			}, 3000 );
	// 		}
	// 	} )
	// 		.catch( ( error ) => {
	// 		} ).then( ( ) => {
	// 			setSaving( false );
	// 		} );
	// };

	// const handleReset = ( e ) => {
	// 	setResetting( true );
	// 	sendCommand( 'has_reset_appearance_settings', {
	// 		nonce: hasSettingsAdmin.resetNonce,
	// 	} ).then( ( response ) => {
	// 		const { data, success } = response.data;
	// 		if ( success ) {
	// 			setAppearanceThemeData( data );
	// 			setTheme( data.theme );
	// 			setSocialNetworkColors( data.icon_colors );
	// 			reset( data, { keepDirtyValues: false, keepDirty: false, keepDefaultValues: false } );
	// 			setIsReset( true );
	// 			setTimeout( () => {
	// 				setIsReset( false );
	// 			}, 3000 );
	// 		}
	// 	} )
	// 		.catch( ( error ) => {
	// 		} ).then( ( ) => {
	// 			setResetting( false );
	// 		} );
	// };

	const getThemes = () => {
		const themes = hasSharingAdmin.themes;

		// Loop through themes and populate label value relationship.
		const themeOptions = [];
		for ( const themeKey in themes ) {
			themeOptions.push( {
				label: themes[ themeKey ],
				value: themeKey,
			} );
		}
		// Add custom option.
		themeOptions.push( {
			label: __( 'Custom', 'highlight-and-share' ),
			value: 'custom',
		} );
		return themeOptions;
	};

	useEffect( () => {
		setThemeData( formValues );
	}, [ formValues ] );

	return (
		<div className="has-admin-theme-customizer">
			<div className="has-admin-component-row">
				<Controller
					name="theme"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<SelectControl
							className="has-admin__theme-select"
							label={ __( 'Select a Theme', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newTheme ) => {
								setTheme( newTheme );
								onChange( newTheme );
							} }
							options={ getThemes() }
						/>
					) }
				/>
			</div>
			{ 'custom' === theme && (
				<>
					<div className="has-admin-component-row has-description">
						<Notice
							message={ __(
								'You have chosen a custom theme. You can configure the settings and see a preview below.',
								'highlight-and-share'
							) }
							status="info"
							politeness="polite"
							inline={ false }
							icon={ CircularInfoIcon }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="iconOnly"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __( 'Hide Labels (Icons Only)', 'highlight-and-share' ) }
									className="has-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'Display only the icons without text.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>

					<div className="has-admin-component-row">
						<Controller
							name="groupIcons"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __(
										'Group Icons Together',
										'highlight-and-share'
									) }
									className="has-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'Modify all icons at once or have them separated with individual colors and backgrounds.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					{ getValues( 'group_icons' ) && (
						<>
							<div className="has-admin-component-row">
								<Controller
									name="backgroundColor"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<HASColorPicker
											value={ value }
											onChange={ ( slug, newValue ) => {
												onChange( newValue );
											} }
											label={ __( 'Background Color', 'highlight-and-share' ) }
											defaultColors={ defaultColors }
											defaultColor={ '#000000' }
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
											} }
											label={ __( 'Background Color Hover', 'highlight-and-share' ) }
											defaultColors={ defaultColors }
											defaultColor={ '#333333' }
											slug={ 'backgroundColorHover' }
										/>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="iconColorsGroup"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<HASColorPicker
											value={ value }
											onChange={ ( slug, newValue ) => {
												onChange( newValue );
											} }
											label={ __( 'Icon Color', 'highlight-and-share' ) }
											defaultColors={ defaultColors }
											defaultColor={ '#FFFFFF' }
											slug={ 'iconColorsGroup' }
										/>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="iconColorsGroupHover"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<HASColorPicker
											value={ value }
											onChange={ ( slug, newValue ) => {
												onChange( newValue );
											} }
											label={ __( 'Icon Color Hover', 'highlight-and-share' ) }
											defaultColors={ defaultColors }
											defaultColor={ '#FFFFFF' }
											slug={ 'iconColorsGroupHover' }
										/>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="borderRadiusGroup"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<DimensionsControl
											label={ __( 'Border Radius', 'highlight-and-share' ) }
											allowNegatives={ false }
											attrTop={ value.attrTop }
											attrRight={ value.attrRight }
											attrBottom={ value.attrBottom }
											attrLeft={ value.attrLeft }
											attrUnit={ value.attrUnit }
											attrSyncUnits={ value.attrSyncUnits }
											labelTop={ __( 'Top Left', 'highlight-and-share' ) }
											labelRight={ __( 'Top Right', 'highlight-and-share' ) }
											labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
											labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
											units={ [ 'px', 'em', 'rem', '%' ] }
											onValuesChange={ ( newValues ) => {
												onChange( newValues );
											} }
										/>
									) }
								/>
							</div>
						</>
					) }
					{ ! getValues( 'groupIcons' ) && (
						<>
							<div className="has-admin-component-row">
								<SocialNetworkColorsTabs />
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="iconBorderRadius"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<DimensionsControl
											label={ __( 'Icons Border Radius', 'highlight-and-share' ) }
											allowNegatives={ false }
											attrTop={ value.attrTop }
											attrRight={ value.attrRight }
											attrBottom={ value.attrBottom }
											attrLeft={ value.attrLeft }
											attrUnit={ value.attrUnit }
											attrSyncUnits={ value.attrSyncUnits }
											labelTop={ __( 'Top Left', 'highlight-and-share' ) }
											labelRight={ __( 'Top Right', 'highlight-and-share' ) }
											labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
											labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
											units={ [ 'px', 'em', 'rem', '%' ] }
											onValuesChange={ ( newValues ) => {
												onChange( newValues );
											} }
										/>
									) }
								/>
							</div>
						</>
					) }
					<div className="has-admin-component-row">
						<Controller
							name="iconPadding"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<DimensionsControl
									label={ __( 'Icons Padding', 'highlight-and-share' ) }
									allowNegatives={ false }
									attrTop={ value.attrTop }
									attrRight={ value.attrRight }
									attrBottom={ value.attrBottom }
									attrLeft={ value.attrLeft }
									attrUnit={ value.attrUnit }
									attrSyncUnits={ value.attrSyncUnits }
									labelTop={ __( 'Padding Left', 'highlight-and-share' ) }
									labelRight={ __( 'Padding Right', 'highlight-and-share' ) }
									labelBottom={ __( 'Padding Bottom', 'highlight-and-share' ) }
									labelLeft={ __( 'Padding Left', 'highlight-and-share' ) }
									units={ [ 'px', 'em', 'rem' ] }
									onValuesChange={ ( newValues ) => {
										onChange( newValues );
									} }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="iconSize"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<>
									<RangeControl
										label={ __(
											'Set the Icon Size',
											'highlight-and-share'
										) }
										step={ 1 }
										value={ value }
										max={ 64 }
										min={ 14 }
										currentInput={ 16 }
										initialPosition={ 16 }
										allowReset={ true }
										className="has-admin__range-control"
										onChange={ ( iconSizeValue ) => {
											onChange( iconSizeValue );
										} }
										trackColor="#4F4F4F"
										railColor="#CECECE"
									/>
								</>
							) }
						/>
					</div>
					{ ! getValues( 'iconOnly' ) && (
						<>
							<div className="has-admin-component-row">
								<Controller
									name="fontSize"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<>
											<RangeControl
												label={ __(
													'Set the Font Size',
													'highlight-and-share'
												) }
												step={ 1 }
												value={ value }
												max={ 64 }
												min={ 14 }
												currentInput={ 16 }
												initialPosition={ 16 }
												allowReset={ true }
												className="has-admin__range-control"
												onChange={ ( fontSizeValue ) => {
													onChange( fontSizeValue );
												} }
												trackColor="#4F4F4F"
												railColor="#CECECE"
											/>
										</>
									) }
								/>
							</div>
						</>
					) }
					{ ! getValues( 'groupIcons' ) && (
						<>
							<div className="has-admin-component-row">
								<Controller
									name="iconGap"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<>
											<RangeControl
												label={ __(
													'Gap Between Items',
													'highlight-and-share'
												) }
												step={ 1 }
												value={ value }
												max={ 48 }
												min={ 0 }
												currentInput={ 15 }
												initialPosition={ 15 }
												allowReset={ true }
												className="has-admin__range-control"
												onChange={ ( iconGapValue ) => {
													onChange( iconGapValue );
												} }
												trackColor="#4F4F4F"
												railColor="#CECECE"
											/>
										</>
									) }
								/>
							</div>
						</>
					) }
				</>
			) }
			<div className="has-admin-component-row">
				<Controller
					name="showTooltips"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __( 'Show Tooltips', 'highlight-and-share' ) }
							className="has-admin__toggle-control"
							checked={ value }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
							help={ __(
								'Hover over a social network to see a tooltip.',
								'highlight-and-share'
							) }
						/>
					) }
				/>
			</div>
			{ getValues( 'showTooltips' ) && (
				<>
					<div className="has-admin-component-row">
						<Controller
							name="tooltipsBackgroundColor"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<HASColorPicker
									value={ value }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
									} }
									label={ __( 'Tooltips Background Color', 'highlight-and-share' ) }
									defaultColors={ defaultColors }
									defaultColor={ '#000000' }
									slug={ 'tooltipsBackgroundColor' }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="tooltipsTextColor"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<HASColorPicker
									value={ value }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
									} }
									label={ __( 'Tooltips Text Color', 'highlight-and-share' ) }
									defaultColors={ defaultColors }
									defaultColor={ '#FFFFFF' }
									slug={ 'tooltipsTextColor' }
								/>
							) }
						/>
					</div>

				</>
			) }
			<div className="has-admin-component-row">
				<Controller
					name="orientation"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<RadioControl
							label="Orientation Type"
							help={ __(
								'Select the orientation of the icons (can be horizontal or vertical).',
								'highlight-and-share'
							) }
							selected={ value }
							options={ [
								{
									label: __( 'Horizontal', 'highlight-and-share' ),
									value: 'horizontal',
								},
								{
									label: __( 'Vertical', 'highlight-and-share' ),
									value: 'vertical',
								},
							] }
							onChange={ ( radioValue ) => onChange( radioValue ) }
						/>
					) }
				/>
			</div>
		</div>
	);
};

export default ThemeCustomizer;
