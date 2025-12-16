/**
 * Max-width component.
 * Credit: Forked from @GenerateBlocks
 */
import React, { useEffect, useState, useMemo } from 'react';

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
	const getDefaultValues = function() {
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
	}

	const { control, setValue, getValues, reset } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const {
		onValuesChange,
	} = props;

	useEffect( () => {
		onValuesChange( formValues );
	}, [ formValues ] );

	useEffect( () => {
		setScreenSize( props.screenSize.toLowerCase() );
		setValue(
			props.screenSize.toLowerCase(),
			getValues( props.screenSize.toLowerCase() )
		);
	}, [ props.screenSize ] );

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
