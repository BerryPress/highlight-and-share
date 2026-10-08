/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';

import {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
	ColorPalette,
	Button,
} from '@wordpress/components';

/**
 * Convert a hex color (3, 4, 6, or 8 digits, with or without '#') to an rgb()/rgba() CSS value.
 *
 * @param {string} hex     Hex color string.
 * @param {number} [alpha] Optional 0-1 alpha override.
 * @return {string} An rgb() or rgba() CSS color value.
 */
const hexToRgba = ( hex, alpha ) => {
	const value = hex.replace( '#', '' );
	const isShort = 3 === value.length || 4 === value.length;
	const expand = ( part ) => ( isShort ? part + part : part );
	const r = parseInt( expand( value.slice( 0, isShort ? 1 : 2 ) ), 16 );
	const g = parseInt( expand( value.slice( isShort ? 1 : 2, isShort ? 2 : 4 ) ), 16 );
	const b = parseInt( expand( value.slice( isShort ? 2 : 4, isShort ? 3 : 6 ) ), 16 );
	const hexAlpha = value.slice( isShort ? 3 : 6, isShort ? 4 : 8 );
	const a = 'number' === typeof alpha
		? alpha
		: ( hexAlpha ? Number( ( parseInt( expand( hexAlpha ), 16 ) / 255 ).toFixed( 2 ) ) : 1 );
	return `rgba(${ r }, ${ g }, ${ b }, ${ a })`;
};

const HASColorPicker = ( props ) => {
	const [ colorKey, setColorKey ] = useState( props.slug );
	const [ isVisible, setIsVisible ] = useState( false );
	const [ color, setColor ] = useState( props.value );

	const {
		defaultColor,
		defaultColors,
		value,
		onChange,
		onOpacityChange,
		label,
		alpha = false,
		valueOpacity,
		slug,
	} = props;

	useEffect( () => {
		setColor( value );
	}, [ value ] );

	// Retrieve colors while avoiding duplicates.
	const getDefaultColors = () => {
		const existingColors = [];
		const newColors = [];
		defaultColors.forEach( ( maybeNewColor, index ) => {
			if ( ! existingColors.includes( maybeNewColor.color ) ) {
				existingColors.push( maybeNewColor.color );
				newColors.push( maybeNewColor );
			}
		} );
		return newColors;
	};

	const opacityIcon = (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="tint"
			className="svg-inline--fa fa-tint fa-w-11"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 352 512"
		>
			<g className="fa-group">
				<path
					className="fa-secondary"
					fill="currentColor"
					d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z"
					opacity="0.4"
				></path>
				<path
					className="fa-primary"
					fill="currentColor"
					d="M176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z"
				></path>
			</g>
		</svg>
	);

	/**
	 * Toggle whether the color popup is showing.
	 */
	const toggleVisible = () => {
		setIsVisible( true );
	};

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		if ( isVisible ) {
			setIsVisible( false );
		}
	};

	return (
		<BaseControl className="has-component-color-picker-wrapper">
			{ !! label && (
				<h3 className="has-color-component-label">
					<span>{ label }</span>
				</h3>
			) }
			<div className="has-component-color-picker">
				<div className="has-color-picker-area has-component-color-picker-palette">
					{ ! isVisible && (
						<>
							<div
								className={ classnames(
									'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette',

									value ? '' : 'components-color-palette__custom-color'
								) }
							>
								<Tooltip text={ __( 'Choose Color', 'quotes-dlx' ) }>
									<button
										type="button"
										aria-expanded={ isVisible }
										className="components-button components-circular-option-picker__option is-pressed"
										onClick={ toggleVisible }
										aria-label={ __(
											'Custom color picker',
											'quotes-dlx'
										) }
										style={ {
											background: color
												? hexToRgba( color, valueOpacity )
												: 'transparent',
										} }
									>
										<span className="components-color-palette__custom-color-gradient" />
									</button>
								</Tooltip>
							</div>
						</>
					) }

					{ isVisible && (
						<div
							className={ classnames(
								'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette',

								value ? '' : 'components-color-palette__custom-color'
							) }
						>
							<Tooltip text={ __( 'Choose Color', 'quotes-dlx' ) }>
								<button
									type="button"
									aria-expanded={ isVisible }
									className="components-button components-circular-option-picker__option is-pressed"
									onClick={ toggleClose }
									aria-label={ __(
										'Custom color picker',
										'quotes-dlx'
									) }
									style={ {
										background: color
											? hexToRgba( color, valueOpacity )
											: 'transparent',
									} }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					) }

					{ isVisible && (
						<Popover
							className="has-component-color-picker"
							onClose={ toggleClose }
							noArrow={ false }
						>
							<BaseControl key={ colorKey }>
								<ColorPicker
									key={ colorKey }
									color={ color }
									onChangeComplete={ ( newColor ) => {
										setColor( newColor.hex );
										onChange( slug, newColor.hex );
									} }
									disableAlpha
									defaultValue={ defaultColor }
								/>
							</BaseControl>

							{ alpha && (
								<div className="has-component-color-opacity">
									<Tooltip text={ __( 'Opacity', 'quotes-dlx' ) }>
										{ opacityIcon }
									</Tooltip>

									<RangeControl
										value={ valueOpacity ? valueOpacity : 0 }
										onChange={ ( opacityValue ) => onOpacityChange( opacityValue ) }
										min={ 0 }
										max={ 1 }
										step={ 0.01 }
										initialPosition={ 1 }
									/>
								</div>
							) }
							<BaseControl className="has-component-color-picker-palette">
								<ColorPalette
									colors={ getDefaultColors() }
									value={ color }
									onChange={ ( newColor ) => {
										onChange( slug, newColor );
										setColor( newColor );
										setColorKey( newColor );
									} }
									disableCustomColors={ true }
									clearable={ false }
								/>
							</BaseControl>
							<div className="components-color-clear-color">
								<Button
									onClick={ () => {
										onChange( slug, defaultColor );
										setColorKey( defaultColor );
										setColor( defaultColor );
									} }
								>
									{ __( 'Clear Color', 'quotes-dlx' ) }
								</Button>
							</div>
						</Popover>
					) }
				</div>
			</div>
		</BaseControl>
	);
};

export default HASColorPicker;
