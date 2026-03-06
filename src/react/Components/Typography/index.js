import React, { useState, useEffect } from 'react';
import fontFamilies from '../../../fonts/fonts';
import { __ } from '@wordpress/i18n';
import { useSettings } from '@wordpress/block-editor';
import { ButtonGroup, Button, Tooltip, SelectControl, BaseControl, TextControl, Popover } from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { geHierarchicalPlaceholderValue } from '../../Utils/TypographyHelper';

const Typography = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const [ fontSizeUnitPopoverVisible, setFontSizeUnitPopoverVisible ] = useState( false );
	const [ fontSizeUnitPopoverAnchor, setFontSizeUnitPopoverAnchor ] = useState( null );
	const [ lineHeightUnitPopoverVisible, setLineHeightUnitPopoverVisible ] = useState( false );
	const [ lineHeightUnitPopoverAnchor, setLineHeightUnitPopoverAnchor ] = useState( null );
	const [ letterSpacingUnitPopoverVisible, setLetterSpacingUnitPopoverVisible ] = useState( false );
	const [ letterSpacingUnitPopoverAnchor, setLetterSpacingUnitPopoverAnchor ] = useState( null );
	const [ fontSettingsPopoverVisible, setFontSettingsPopoverVisible ] = useState( false );
	const [ fontSettingsPopoverAnchor, setFontSettingsPopoverAnchor ] = useState( null );
	const [ isVisible, setIsVisible ] = useState( false ); // for the main typography settings popup.
	const [ isToggled, setIsToggled ] = useState( false ); // for the main typography settings popup.

	const getDefaultValues = ( newProps) => {
		return {
			mobile: {
				fontFamily: props.values.mobile.fontFamily,
				fontFamilySlug: props.values.mobile.fontFamilySlug,
				fontSize: props.values.mobile.fontSize,
				fontSizeUnit: props.values.mobile.fontSizeUnit,
				fontWeight: props.values.mobile.fontWeight,
				lineHeight: props.values.mobile.lineHeight,
				lineHeightUnit: props.values.mobile.lineHeightUnit,
				textTransform: props.values.mobile.textTransform,
				letterSpacing: props.values.mobile.letterSpacing,
				letterSpacingUnit: props.values.mobile.letterSpacingUnit,
				fontType: props.values.mobile.fontType,
				fontFallback: props.values.mobile.fontFallback,
			},
			tablet: {
				fontFamily: props.values.tablet.fontFamily,
				fontFamilySlug: props.values.tablet.fontFamilySlug,
				fontSize: props.values.tablet.fontSize,
				fontSizeUnit: props.values.tablet.fontSizeUnit,
				fontWeight: props.values.tablet.fontWeight,
				lineHeight: props.values.tablet.lineHeight,
				lineHeightUnit: props.values.tablet.lineHeightUnit,
				textTransform: props.values.tablet.textTransform,
				letterSpacing: props.values.tablet.letterSpacing,
				letterSpacingUnit: props.values.tablet.letterSpacingUnit,
				fontType: props.values.tablet.fontType,
				fontFallback: props.values.tablet.fontFallback,
			},
			desktop: {
				fontFamily: props.values.desktop.fontFamily,
				fontFamilySlug: props.values.desktop.fontFamilySlug,
				fontSize: props.values.desktop.fontSize,
				fontSizeUnit: props.values.desktop.fontSizeUnit,
				fontWeight: props.values.desktop.fontWeight,
				lineHeight: props.values.desktop.lineHeight,
				lineHeightUnit: props.values.desktop.lineHeightUnit,
				textTransform: props.values.desktop.textTransform,
				letterSpacing: props.values.desktop.letterSpacing,
				letterSpacingUnit: props.values.desktop.letterSpacingUnit,
				fontType: props.values.desktop.fontType,
				fontFallback: props.values.desktop.fontFallback,
			},
		};
	};

	const {
		control,
		setValue,
		getValues,
		reset,
	} = useForm( {
		defaultValues: getDefaultValues( props ),
	} );

	const [ blockLevelFontFamilies ] = useSettings( 'typography.fontFamilies' );

	const formValues = useWatch( { control } );

	const { isDirty } = useFormState( { control } );

	const { label } = props;

	useEffect( () => {
		if ( isDirty ) {
			props.onValuesChange( formValues );
			reset( formValues, {
				keepDirty: false,
			} );
		}
	}, [ formValues ] );

	useEffect( () => {
		setScreenSize( props.screenSize.toLowerCase() );
		const newDefaultValues = getDefaultValues( props );
		setValue(
			props.screenSize.toLowerCase(),
			newDefaultValues[ props.screenSize.toLowerCase() ],
			{
				keepDirty: false,
			}
		);
	}, [ props.screenSize ] );

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		setIsToggled( true );
		setIsVisible( ! isVisible );
		setTimeout( () => {
			setIsToggled( false );
		}, 500 );
	};

	// Retrieve the list all available fonts.
	const getFonts = () => {
		const customFonts = has_gutenberg.customFonts;
		let fonts = [];
		const families = Object.values( fontFamilies );
		let mergedFamilies = [];
		families.forEach( ( fontFamily ) => {
			fonts.push( { label: fontFamily.name, value: fontFamily.slug } );
			mergedFamilies.push( { family: fontFamily.family, slug: fontFamily.slug, fallback: fontFamily.fallback, type: fontFamily.type } );
		} );

		if ( blockLevelFontFamilies ) {
			const { theme } = blockLevelFontFamilies;

			if ( theme ) {
				theme.forEach( ( fontFamily ) => {
					fonts.push( { label: fontFamily.name, value: fontFamily.slug } );
					mergedFamilies.push( { family: fontFamily.name, slug: fontFamily.slug, fallback: fontFamily.fallback, type: 'web' } );
				} );
			}
		}
		// Push custom fonts to the front.
		customFonts.forEach( ( font ) => {
			fonts.unshift( { label: font.label, value: font.value } );
			mergedFamilies.push( { family: font.label, slug: font.value, fallback: 'serif', type: 'custom' } );
		} );
		// Add placeholder.
		fonts.unshift( { label: __( 'Select a Font', 'highlight-and-share' ), value: '' } );

		// Eliminate duplicate fonts.
		fonts = fonts.filter( ( font, index, self ) =>
			index === self.findIndex( ( t ) => t.value === font.value )
		);
		mergedFamilies = mergedFamilies.filter( ( font, index, self ) =>
			index === self.findIndex( ( t ) => t.slug === font.slug )
		);

		// Don't show font family on non-desktop sizes.
		if ( 'desktop' !== screenSize ) {
			return null;
		}
		return (
			<>
				<Controller
					name={ `${ screenSize }.fontFamilySlug` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<SelectControl
							label={ __( 'Font Family', 'highlight-and-share' ) }
							value={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).fontFamilySlug, 'fontFamilySlug' ) || 'Arial' }
							options={ fonts }
							onChange={ ( newValue ) => {
								onChange( newValue );

								// Get font family name for CSS.
								mergedFamilies.forEach( ( font ) => {
									if ( font.slug === newValue ) {
										setValue( `${ screenSize }.fontFamily`, font.family );
										setValue( `${ screenSize }.fontFallback`, font.fallback );
										setValue( `${ screenSize }.fontType`, font.type );
									}
								} );
							} }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontFamily` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).fontFamily }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontFallback` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).fontFallback }
						/>
					) }
				/>
			</>
		);
	};

	const getTextTransform = () => {
		const textTransform = [
			{ label: __( 'None', 'highlight-and-share' ), value: 'none' },
			{ label: __( 'Uppercase', 'highlight-and-share' ), value: 'uppercase' },
			{ label: __( 'Lowercase', 'highlight-and-share' ), value: 'lowercase' },
			{ label: __( 'Capitalize', 'highlight-and-share' ), value: 'capitalize' },
		];
		return (
			<Controller
				name={ `${ screenSize }.textTransform` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Text Transform', 'highlight-and-share' ) }
						value={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).textTransform, 'textTransform' ) }
						options={ textTransform }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getFontSize = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.fontSize` }
					control={ control }
					render={ ( { field: { onChange } } ) => (
						<TextControl
							label={ __( 'Font Size', 'highlight-and-share' ) }
							value={ getValues( screenSize ).fontSize }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							type="number"
							placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).fontSize, 'fontSize' ) }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontSizeUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).fontSizeUnit }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.fontSizeUnit` ) }
					onClick={ () => {
						setFontSizeUnitPopoverVisible( ! fontSizeUnitPopoverVisible );
					} }
					ref={ setFontSizeUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.fontSizeUnit` ) }
				</Button>
				{ true === fontSizeUnitPopoverVisible && (
					<Popover
						className="has-component-font-unit-picker"
						noArrow={ true }
						anchor={ fontSizeUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'px' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'em' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'rem' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getFontWeights = () => {
		const fontWeights = [
			{ label: __( '100', 'highlight-and-share' ), value: '100' },
			{ label: __( '200', 'highlight-and-share' ), value: '200' },
			{ label: __( '300', 'highlight-and-share' ), value: '300' },
			{ label: __( '400', 'highlight-and-share' ), value: '400' },
			{ label: __( '500', 'highlight-and-share' ), value: '500' },
			{ label: __( '600', 'highlight-and-share' ), value: '600' },
			{ label: __( '700', 'highlight-and-share' ), value: '700' },
			{ label: __( '800', 'highlight-and-share' ), value: '800' },
			{ label: __( '900', 'highlight-and-share' ), value: '900' },
		];
		return (
			<Controller
				name={ `${ screenSize }.fontWeight` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Font Weight', 'highlight-and-share' ) }
						value={ getValues( screenSize ).fontWeight }
						options={ fontWeights }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getLineHeight = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.lineHeight` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Line Height', 'highlight-and-share' ) }
							value={ getValues( screenSize ).lineHeight }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							type="number"
							placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).lineHeight, 'lineHeight' ) }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.lineHeightUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).lineHeightUnit }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.lineHeightUnit` ) }
					onClick={ () => {
						setLineHeightUnitPopoverVisible( ! lineHeightUnitPopoverVisible );
					} }
					ref={ setLineHeightUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.lineHeightUnit` ) }
				</Button>
				{ true === lineHeightUnitPopoverVisible && (
					<Popover
						className="has-component-font-unit-picker"
						noArrow={ true }
						anchor={ lineHeightUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'px' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'em' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'rem' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getFontType = () => {
		return (
			<Controller
				name={ `${ screenSize }.fontType` }
				control={ control }
				render={ ( { field: { value } } ) => (
					<TextControl
						type="hidden"
						value={ getValues( screenSize ).fontType }
					/>
				) }
			/>
		);
	};

	const getFontFallback = () => {
		return (
			<Controller
				name={ `${ screenSize }.fontFallback` }
				control={ control }
				render={ ( { field: { value } } ) => (
					<TextControl
						type="hidden"
						value={ getValues( screenSize ).fontFallback }
					/>
				) }
			/>
		);
	};

	const getLetterSpacing = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.letterSpacing` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Letter Spacing', 'highlight-and-share' ) }
							value={ getValues( screenSize ).letterSpacing }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							type="number"
							placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).letterSpacing, 'letterSpacing' ) }
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.letterSpacingUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ getValues( screenSize ).letterSpacingUnit }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.letterSpacingUnit` ) }
					onClick={ () => {
						setLetterSpacingUnitPopoverVisible( ! letterSpacingUnitPopoverVisible );
					} }
					ref={ setLetterSpacingUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.letterSpacingUnit` ) }
				</Button>
				{ true === letterSpacingUnitPopoverVisible && (
					<Popover
						className="has-component-font-unit-picker"
						noArrow={ true }
						anchor={ letterSpacingUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'px' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'em' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'rem' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getPopoverContent = () => {
		return (
			<BaseControl className="has-typography-picker">
				<div className="has-typography-picker__row has-typography-picker__row__col-full">
					<div className="has-typography-picker__row_item">
						{ getFonts() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-full">
					<div className="has-typography-picker__row_item">
						{ getTextTransform() }
						{ getFontType() }
						{ getFontFallback() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-2">
					<div className="has-typography-picker__row_item has-units">
						{ getFontSize() }
					</div>
					<div className="has-typography-picker__row_item">
						{ getFontWeights() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-2">
					<div className="has-typography-picker__row_item has-units">
						{ getLineHeight() }
					</div>
					<div className="has-typography-picker__row_item has-units">
						{ getLetterSpacing() }
					</div>
				</div>
			</BaseControl>
		);
	};

	return (
		<BaseControl className="has-typography-picker-wrapper">
			<div className="has-typography-component-label">
				{ label }
			</div>
			<div className="has-typography-component-settings">
				<Button
					variant="secondary"
					label={ __( 'Font Settings', 'highlight-and-share' ) }
					onClick={ () => {
						if ( isToggled ) {
							setIsToggled( false );
						} else {
							setIsVisible( ! isVisible );
						}
					} }
					icon="admin-settings"
				/>
				{ true === isVisible && (
					<Popover
						className="has-component-typography-popup"
						noArrow={ false }
						anchor={ fontSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
						onClose={ toggleClose }
					>
						{ getPopoverContent() }
					</Popover>
				) }
			</div>
		</BaseControl>
	);
};
export default Typography;
