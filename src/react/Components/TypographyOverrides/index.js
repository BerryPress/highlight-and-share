/**
 * TypographyOverrides – typography controls for theme overrides (no device support).
 * Stores values in themeOverrides with flat keys (quote* or shareText*).
 */

import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
	ButtonGroup,
	Button,
	SelectControl,
	BaseControl,
	TextControl,
	Popover,
} from '@wordpress/components';
import fontFamilies from '../../../fonts/fonts';
import { useThemeOverrides } from '../../../blocks/click-to-share/hooks/useThemeOverrides';

const TEXT_TRANSFORM_OPTIONS = [
	{ label: __( 'None', 'highlight-and-share' ), value: 'none' },
	{ label: __( 'Uppercase', 'highlight-and-share' ), value: 'uppercase' },
	{ label: __( 'Lowercase', 'highlight-and-share' ), value: 'lowercase' },
	{ label: __( 'Capitalize', 'highlight-and-share' ), value: 'capitalize' },
];

const FONT_WEIGHT_OPTIONS = [
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

const UNIT_OPTIONS = [ 'px', 'em', 'rem' ];

const TypographyOverrides = ( props ) => {
	const { variant, attributes, setAttributes, label } = props;

	const [ fontSizeUnitPopoverVisible, setFontSizeUnitPopoverVisible ] = useState( false );
	const [ fontSizeUnitPopoverAnchor, setFontSizeUnitPopoverAnchor ] = useState( null );
	const [ lineHeightUnitPopoverVisible, setLineHeightUnitPopoverVisible ] = useState( false );
	const [ lineHeightUnitPopoverAnchor, setLineHeightUnitPopoverAnchor ] = useState( null );
	const [ letterSpacingUnitPopoverVisible, setLetterSpacingUnitPopoverVisible ] = useState( false );
	const [ letterSpacingUnitPopoverAnchor, setLetterSpacingUnitPopoverAnchor ] = useState( null );
	const [ fontSettingsPopoverAnchor, setFontSettingsPopoverAnchor ] = useState( null );
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isToggled, setIsToggled ] = useState( false );

	const { getThemeOverride, setThemeOverride } = useThemeOverrides( attributes, setAttributes );

	const prefix = variant === 'shareText' ? 'shareText' : 'quote';

	const getVal = ( key, defaultValue = '' ) => getThemeOverride( prefix + key, defaultValue );
	const updateVal = ( key, value ) => setThemeOverride( prefix + key, value );

	const toggleClose = () => {
		setIsToggled( true );
		setIsVisible( ! isVisible );
		setTimeout( () => setIsToggled( false ), 500 );
	};

	const getFonts = () => {
		const customFonts = has_gutenberg.customFonts || [];
		const fonts = [];
		const mergedFamilies = [];
		Object.values( fontFamilies ).forEach( ( fontFamily ) => {
			fonts.push( { label: fontFamily.name, value: fontFamily.slug } );
			mergedFamilies.push( {
				family: fontFamily.family,
				slug: fontFamily.slug,
				fallback: fontFamily.fallback,
				type: fontFamily.type,
			} );
		} );
		customFonts.forEach( ( font ) => {
			fonts.unshift( { label: font.label, value: font.value } );
			mergedFamilies.push( {
				family: font.label,
				slug: font.value,
				fallback: 'serif',
				type: 'custom',
			} );
		} );
		fonts.unshift( { label: __( 'Select a Font', 'highlight-and-share' ), value: '' } );
		const uniqueFonts = fonts.filter( ( font, i, arr ) => i === arr.findIndex( ( t ) => t.value === font.value ) );
		const uniqueMerged = mergedFamilies.filter( ( f, i, arr ) => i === arr.findIndex( ( t ) => t.slug === f.slug ) );
		return { fonts: uniqueFonts, mergedFamilies: uniqueMerged };
	};

	const { fonts, mergedFamilies } = getFonts();

	const handleFontFamilyChange = ( newValue ) => {
		const themeOverrides = attributes.themeOverrides ?? {};
		const updates = { [ prefix + 'FontFamilySlug' ]: newValue };
		const font = mergedFamilies.find( ( f ) => f.slug === newValue );
		if ( font ) {
			updates[ prefix + 'FontFamily' ] = font.family;
			updates[ prefix + 'FontFallback' ] = font.fallback;
			updates[ prefix + 'FontType' ] = font.type;
		}
		setAttributes( {
			themeOverrides: { ...themeOverrides, ...updates },
		} );
	};

	const renderUnitPicker = ( unitKey, popoverVisible, setPopoverVisible, anchorRef, setAnchorRef ) => (
		<>
			<Button
				variant="secondary"
				onClick={ () => setPopoverVisible( ! popoverVisible ) }
				ref={ setAnchorRef }
			>
				{ getVal( unitKey, 'px' ) }
			</Button>
			{ popoverVisible && (
				<Popover
					className="has-component-font-unit-picker"
					noArrow
					anchor={ anchorRef }
					onClose={ () => setPopoverVisible( false ) }
				>
					<ButtonGroup>
						{ UNIT_OPTIONS.map( ( u ) => (
							<Button
								key={ u }
								isPrimary={ getVal( unitKey, 'px' ) === u }
								onClick={ () => {
									updateVal( unitKey, u );
									setPopoverVisible( false );
								} }
							>
								{ u }
							</Button>
						) ) }
					</ButtonGroup>
				</Popover>
			) }
		</>
	);

	return (
		<BaseControl className="has-typography-picker-wrapper">
			<div className="has-typography-component-label">{ label }</div>
			<div className="has-typography-component-settings">
				<Button
					variant="secondary"
					label={ __( 'Font Settings', 'highlight-and-share' ) }
					icon="admin-settings"
					onClick={ () => ( isToggled ? setIsToggled( false ) : setIsVisible( ! isVisible ) ) }
					ref={ setFontSettingsPopoverAnchor }
				/>
				{ isVisible && (
					<Popover
						className="has-component-typography-popup"
						noArrow={ false }
						anchor={ fontSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
						onClose={ toggleClose }
					>
						<BaseControl className="has-typography-picker">
							<div className="has-typography-picker__row has-typography-picker__row__col-full">
								<div className="has-typography-picker__row_item">
									<SelectControl
										label={ __( 'Font Family', 'highlight-and-share' ) }
										value={ getVal( 'FontFamilySlug', 'arial' ) || 'arial' }
										options={ fonts }
										onChange={ handleFontFamilyChange }
									/>
								</div>
							</div>
							<div className="has-typography-picker__row has-typography-picker__row__col-full">
								<div className="has-typography-picker__row_item">
									<SelectControl
										label={ __( 'Text Transform', 'highlight-and-share' ) }
										value={ getVal( 'TextTransform', 'none' ) }
										options={ TEXT_TRANSFORM_OPTIONS }
										onChange={ ( v ) => updateVal( 'TextTransform', v ) }
									/>
								</div>
							</div>
							<div className="has-typography-picker__row has-typography-picker__row__col-2">
								<div className="has-typography-picker__row_item has-units">
									<TextControl
										label={ __( 'Font Size', 'highlight-and-share' ) }
										value={ getVal( 'FontSize', '' ) }
										onChange={ ( v ) => updateVal( 'FontSize', v ) }
										type="number"
									/>
									{ renderUnitPicker( 'FontSizeUnit', fontSizeUnitPopoverVisible, setFontSizeUnitPopoverVisible, fontSizeUnitPopoverAnchor, setFontSizeUnitPopoverAnchor ) }
								</div>
								<div className="has-typography-picker__row_item">
									<SelectControl
										label={ __( 'Font Weight', 'highlight-and-share' ) }
										value={ getVal( 'FontWeight', '400' ) }
										options={ FONT_WEIGHT_OPTIONS }
										onChange={ ( v ) => updateVal( 'FontWeight', v ) }
									/>
								</div>
							</div>
							<div className="has-typography-picker__row has-typography-picker__row__col-2">
								<div className="has-typography-picker__row_item has-units">
									<TextControl
										label={ __( 'Line Height', 'highlight-and-share' ) }
										value={ getVal( 'LineHeight', '' ) }
										onChange={ ( v ) => updateVal( 'LineHeight', v ) }
										type="number"
									/>
									{ renderUnitPicker( 'LineHeightUnit', lineHeightUnitPopoverVisible, setLineHeightUnitPopoverVisible, lineHeightUnitPopoverAnchor, setLineHeightUnitPopoverAnchor ) }
								</div>
								<div className="has-typography-picker__row_item has-units">
									<TextControl
										label={ __( 'Letter Spacing', 'highlight-and-share' ) }
										value={ getVal( 'LetterSpacing', '' ) }
										onChange={ ( v ) => updateVal( 'LetterSpacing', v ) }
										type="number"
									/>
									{ renderUnitPicker( 'LetterSpacingUnit', letterSpacingUnitPopoverVisible, setLetterSpacingUnitPopoverVisible, letterSpacingUnitPopoverAnchor, setLetterSpacingUnitPopoverAnchor ) }
								</div>
							</div>
						</BaseControl>
					</Popover>
				) }
			</div>
		</BaseControl>
	);
};

export default TypographyOverrides;
