/**
 * Max-width component.
 * Credit: Forked from @GenerateBlocks
 */
import React, { useEffect, useState, useRef } from 'react';

/**
 * External dependencies
 */
import './editor.scss';
import UnitChooser from '../../../../react/Components/unit-picker';
import { getHierarchicalValueUnit, geHierarchicalPlaceholderValue } from '../../../../react/Utils/TypographyHelper';

import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Tooltip, TextControl } from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';

const MaxWidth = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const getDefaultValues = () => {
		return {
			mobile: {
				width: props.values.mobile.width,
				unit: props.values.mobile.unit,
			},
			tablet: {
				width: props.values.tablet.width,
				unit: props.values.tablet.unit,
			},
			desktop: {
				width: props.values.desktop.width,
				unit: props.values.desktop.unit,
			},
		};
	};

	const { control, setValue, getValues, reset } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );
	const isInternalUpdate = useRef( false );
	const prevPropsValues = useRef( props.values );

	const {
		onValuesChange,
	} = props;

	// Sync form state when props.values changes externally (not from our updates).
	useEffect( () => {
		// Check if props.values actually changed.
		const hasChanged = JSON.stringify( prevPropsValues.current ) !== JSON.stringify( props.values );
		if ( hasChanged && ! isInternalUpdate.current ) {
			reset( getDefaultValues() );
		}
		prevPropsValues.current = props.values;
		isInternalUpdate.current = false;
	}, [ props.values, reset ] );

	// Ensure all screen sizes are preserved when updating parent.
	useEffect( () => {
		// Check if formValues has all required screen sizes.
		if ( formValues && formValues.mobile && formValues.tablet && formValues.desktop ) {
			isInternalUpdate.current = true;
			onValuesChange( formValues );
		} else {
			// If formValues is incomplete, merge with props.values to preserve all screen sizes.
			const mergedValues = {
				mobile: formValues?.mobile ?? props.values.mobile,
				tablet: formValues?.tablet ?? props.values.tablet,
				desktop: formValues?.desktop ?? props.values.desktop,
			};
			// Only update if merged values are different from current props.
			if ( JSON.stringify( mergedValues ) !== JSON.stringify( props.values ) ) {
				isInternalUpdate.current = true;
				onValuesChange( mergedValues );
			}
		}
	}, [ formValues, onValuesChange, props.values ] );

	useEffect( () => {
		setScreenSize( props.screenSize.toLowerCase() );
		setValue(
			props.screenSize.toLowerCase(),
			getValues( props.screenSize.toLowerCase() )
		);
	}, [ props.screenSize, setValue, getValues ] );

	return (
		<>
			<Controller
				control={ control }
				name={ `${ screenSize }.unit` }
				render={ ( { field: { onChange, value } } ) => (
					<UnitChooser
						label={ __( 'Maximum Width', 'highlight-and-share' ) }
						value={ getHierarchicalValueUnit( props.values, screenSize, getValues( screenSize ).unit, 'unit' ) }
						units={ [ 'px', 'em', 'rem', '%', 'vw' ] }
						onClick={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
			<Controller
				control={ control }
				name={ `${ screenSize }.width` }
				render={ ( { field: { onChange, value } } ) => (
					<TextControl
						type={ 'text' }
						value={ getValues( screenSize ).width }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
						placeholder={ geHierarchicalPlaceholderValue(
							props.values,
							screenSize,
							getValues( screenSize ).width,
							'width'
						) }
					/>
				) }
			/>
		</>
	);
};

export default MaxWidth;
