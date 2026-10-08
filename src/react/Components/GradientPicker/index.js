/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */

import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	Popover,
	Button,
	GradientPicker,
} from '@wordpress/components';

const HASGradientPicker = ( {
	label = __( 'Gradient Color', 'highlight-and-share' ),
	clearable = false,
	value = '',
	onChange = () => {},
	...props
} ) => {
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isToggled, setIsToggled ] = useState( false );
	const [ gradientPickerButtonAnchor, setGradientPickerButtonAnchor ] = useState( null );

	/**
	 * Get a gradient style object.
	 *
	 * @return {Object} Gradient style object.
	 */
	const getGradientStyles = () => {
		const hexRegex = /#?[0-9A-Fa-f]{6}/gm; // From: https://linuxhint.com/check-if-string-is-hex-in-javascript/
		if ( '' === value ) {
			return {
				background: '#FFFFFF',
			};
		}
		if ( value.match( hexRegex ) ) {
			return {
				backgroundColor: value,
			};
		}
		// Return gradient style value.
		return {
			backgroundImage: value,
		};
	};

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

	return (
		<BaseControl className="has-component-gradient-picker-wrapper">
			<h3>{ label }</h3>
			<Button
				className="has-component-gradient-picker"
				label={ __( 'Open Gradient Picker', 'highlight-and-share' ) }
				style={ getGradientStyles() }
				ref={ gradientPickerButtonAnchor }
				onClick={ () => {
					if ( isToggled ) {
						setIsToggled( false );
					} else {
						setIsVisible( ! isVisible );
					}
				} }
			/>
			{ true === isVisible && (
				<Popover
					className="has-component-gradient-picker-popover"
					noArrow={ false }
					anchor={ gradientPickerButtonAnchor }
					placement="left"
					offset={ 8 }
					onClose={ toggleClose }
				>
					<GradientPicker
						value={ value }
						onChange={ onChange }
						clearable={ clearable }
						gradients={ [] }
					/>
				</Popover>
			) }

		</BaseControl>
	);
};

export default HASGradientPicker;
