/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */

import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	Button,
} from '@wordpress/components';

const HASGradientSync = ( {
	label = __( 'Gradient Color', 'highlight-and-share' ),
	attributes = {},
	setAttributes = () => {},
	...props
} ) => {

	const { backgroundGradient, backgroundGradientSync } = attributes;

	useEffect( () => {
		if ( backgroundGradientSync ) {
			setAttributes( {
				backgroundGradientHover: backgroundGradient,
			} );
		}
	}, [ backgroundGradient, backgroundGradientSync ] );

	return (
		<BaseControl className="has-component-gradient-sync-wrapper">
			<h3>{ label }</h3>
			<Button
				className="has-component-gradient-sync"
				label={ __( 'Sync Background Gradients', 'highlight-and-share' ) }
				icon={ backgroundGradientSync ? 'admin-links' : 'editor-unlink' }
				onClick={ () => {
					setAttributes( {
						backgroundGradientSync: ! backgroundGradientSync,
					} );
				} }
				variant={ backgroundGradientSync ? 'primary' : 'secondary' }
			/>
		</BaseControl>
	);
};

export default HASGradientSync;
