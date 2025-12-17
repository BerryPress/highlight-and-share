/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */
import React, { useEffect, useState } from 'react';

/**
 * External dependencies
 */
import './editor.scss';
import UnitPicker from '../unit-picker';

import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Tooltip, TextControl } from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import {
	geHierarchicalPlaceholderValue,
	getHierarchicalValueUnit,
	getHierarchicalValueUnitSync,
} from '../../Utils/DimensionsHelper';

const DimensionsControlBlock = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );

	const getDefaultValues = ( newProps ) => {
		return {
			mobile: {
				top: newProps.values.mobile.top,
				right: newProps.values.mobile.right,
				bottom: newProps.values.mobile.bottom,
				left: newProps.values.mobile.left,
				unit: newProps.values.mobile.unit,
				unitSync: newProps.values.mobile.unitSync,
			},
			tablet: {
				top: newProps.values.tablet.top,
				right: newProps.values.tablet.right,
				bottom: newProps.values.tablet.bottom,
				left: newProps.values.tablet.left,
				unit: newProps.values.tablet.unit,
				unitSync: newProps.values.tablet.unitSync,
			},
			desktop: {
				top: newProps.values.desktop.top,
				right: newProps.values.desktop.right,
				bottom: newProps.values.desktop.bottom,
				left: newProps.values.desktop.left,
				unit: newProps.values.desktop.unit,
				unitSync: newProps.values.desktop.unitSync,
			},
		};
	};

	const { control, setValue, getValues, reset } = useForm( {
		defaultValues: getDefaultValues( props ),
	} );

	const { isDirty } = useFormState( { control } );

	const formValues = useWatch( { control } );

	const {
		label = __( 'Padding', 'highlight-and-share' ),
		labelTop = __( 'Top', 'highlight-and-share' ),
		labelRight = __( 'Right', 'highlight-and-share' ),
		labelBottom = __( 'Bottom', 'highlight-and-share' ),
		labelLeft = __( 'Left', 'highlight-and-share' ),
		units,
		onValuesChange,
	} = props;

	useEffect( () => {
		if ( isDirty ) {
			onValuesChange( formValues );
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
				shouldDirty: false,
			}
		);
	}, [ props.screenSize ] );
	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeAllValues = ( value ) => {
		const values = getValues( screenSize );
		values.top = value;
		values.right = value;
		values.bottom = value;
		values.left = value;
		setValue( screenSize, values );
	};

	/**
	 * When the sync value is selected, sync all values to the maximum number.
	 */
	const syncUnits = () => {
		// Toggle unit sync value.
		const values = getValues( screenSize );
		values.unitSync = ! values.unitSync;
		setValue( screenSize, values );

		// If we're syncing, set all values to the maximum.
		if ( values.unitSync ) {
			const numbers = [
				getValues( screenSize ).top,
				getValues( screenSize ).right,
				getValues( screenSize ).bottom,
				getValues( screenSize ).left,
			];
			const syncValue = Math.max.apply( null, numbers );
			changeAllValues( syncValue );
		}
	};

	/**
	 * Change the units.
	 *
	 * @param {string} value Unit changing (px, em, rem, vh).
	 */
	const onChangeUnits = ( value ) => {
		const values = getValues( screenSize );
		values.unit = value;
		setValue( screenSize, values );
	};

	const onDimensionChange = ( value ) => {
		if (
			getHierarchicalValueUnitSync(
				props.values,
				screenSize,
				getValues( screenSize ).unitSync
			)
		) {
			changeAllValues( value );
		}
	};

	const syncIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
			<path
				fill="currentColor"
				d="M580.2 267.3c56.2-56.2 56.2-147.4 0-203.6s-147.4-56.3-203.6 0L365.3 75l45.3 45.3 11.3-11.3c31.2-31.2 81.9-31.2 113.1 0s31.2 81.9 0 113.1L421.8 335.2c-31.2 31.2-81.9 31.2-113.1 0-25.6-25.6-30.3-64.3-13.8-94.6 1.8-3.4 3.9-6.7 6.3-9.8L250 192.4c-4.3 5.7-8.1 11.6-11.4 17.8-29.5 54.6-21.3 124.2 24.9 170.3 56.2 56.2 147.4 56.2 203.6 0l113.1-113.2zM59.8 244.7c-56.2 56.2-56.2 147.4 0 203.6s147.4 56.2 203.6 0l11.3-11.3-45.3-45.3-11.3 11.3c-31.2 31.2-81.9 31.2-113.1 0s-31.2-81.9 0-113.1l113.2-113.1c31.2-31.2 81.9-31.2 113.1 0 25.6 25.6 30.3 64.3 13.8 94.6-1.8 3.4-3.9 6.7-6.3 9.8l51.2 38.4c4.3-5.7 8.1-11.6 11.4-17.8 29.5-54.6 21.3-124.2-24.9-170.3-56.2-56.2-147.4-56.2-203.6 0L59.8 244.7z"
			/>
		</svg>
	);

	return (
		<>
			<div className="components-base-control components-has-dimensions-control">
				<Controller
					name={ `${ screenSize }.unit` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<UnitPicker
							label={ label }
							value={ getHierarchicalValueUnit(
								props.values,
								screenSize,
								getValues( screenSize ).unit
							) }
							units={ units }
							onClick={ ( newValue ) => {
								onChange( newValue );
								onChangeUnits( newValue );
							} }
						/>
					) }
				/>

				<div className="components-has-dimensions-control__inputs">
					<Controller
						name={ `${ screenSize }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelTop }
							>
								<TextControl
									value={ getValues( screenSize ).top }
									type="number"
									label={ labelTop }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
									placeholder={ geHierarchicalPlaceholderValue(
										props.values,
										screenSize,
										getValues( screenSize ).top,
										'top'
									) }
									data-tooltip={ labelTop }
								/>
							</div>
						) }
					/>
					<Controller
						name={ `${ screenSize }.right` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelRight }
							>
								<TextControl
									value={ getValues( screenSize ).right }
									type="number"
									label={ labelRight }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
									placeholder={ geHierarchicalPlaceholderValue(
										props.values,
										screenSize,
										getValues( screenSize ).right,
										'right'
									) }
									data-tooltip={ labelRight }
								/>
							</div>
						) }
					/>
					<Controller
						name={ `${ screenSize }.bottom` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelBottom }
							>
								<TextControl
									value={ getValues( screenSize ).bottom }
									type="number"
									label={ labelBottom }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
									placeholder={ geHierarchicalPlaceholderValue(
										props.values,
										screenSize,
										getValues( screenSize ).bottom,
										'bottom'
									) }
								/>
							</div>
						) }
					/>
					<Controller
						name={ `${ screenSize }.left` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelLeft }
							>
								<TextControl
									value={ getValues( screenSize ).left ?? 0 }
									type="number"
									label={ labelLeft }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
									placeholder={ geHierarchicalPlaceholderValue(
										props.values,
										screenSize,
										getValues( screenSize ).left,
										'left'
									) }
								/>
							</div>
						) }
					/>
					<Tooltip
						text={
							!! getValues( screenSize ).unitSync
								? __( 'Unsync', 'highlight-and-share' )
								: __( 'Sync', 'highlight-and-share' )
						}
					>
						<Button
							className="components-has-dimensions-control_sync"
							aria-label={ __( 'Sync Units', 'generateblocks' ) }
							isPrimary={ getHierarchicalValueUnitSync(
								props.values,
								screenSize,
								getValues( screenSize ).unitSync
							) }
							aria-pressed={ getHierarchicalValueUnitSync(
								props.values,
								screenSize,
								getValues( screenSize ).unitSync
							) }
							// eslint-disable-next-line no-unused-vars
							onClick={ ( value ) => syncUnits() }
							isSmall
						>
							{ syncIcon }
						</Button>
					</Tooltip>
				</div>

				<div className="components-has-dimensions-control__input-labels">
					<span className="components-has-dimensions-control__number-label">
						{ labelTop }
					</span>
					<span className="components-has-dimensions-control__number-label">
						{ labelRight }
					</span>
					<span className="components-has-dimensions-control__number-label">
						{ labelBottom }
					</span>
					<span className="components-has-dimensions-control__number-label">
						{ labelLeft }
					</span>
					<span className="components-has-dimensions-control__number-label"></span>
				</div>
			</div>
		</>
	);
};

export default DimensionsControlBlock;
