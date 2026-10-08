import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';

import ColorPicker from '../../../../react/Components/ColorPicker';
import ApplyColorSyncModal from './SyncModal';
import ApplyColorSyncContext from './context';


import {
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarButton,
	Popover,
	Modal,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const ColorPickerHoverControl = ( props ) => {
	const palette = has_gutenberg.colorPalette;

	const { showApplyColorSyncModal, setShowApplyColorSyncModal } = useContext( ApplyColorSyncContext );

	const [ colorMode, setColorMode ] = useState( 'sync' === props.isSync ? 'sync' : 'normal' );
	const [ normalColor, setNormalColor ] = useState( props.normalColor );
	const [ hoverColor, setHoverColor ] = useState( props.hoverColor );
	const [ syncColor, setSyncColor ] = useState( props.normalColor );

	return (
		<>
			<div className="has-color-picker-hover">
				<div className="has-color-picker-hover__color-mode">
					<Button
						isSmall={ true }
						onClick={ () => setColorMode( 'normal' ) }
						className={ classnames( {
							'is-primary': 'normal' === colorMode,
						} ) }
						label={ __( 'Normal', 'highlight-and-share' ) }
					>
						{ __( 'Normal', 'highlight-and-share' ) }
					</Button>
					<Button
						isSmall={ true }
						onClick={ () => setColorMode( 'hover' ) }
						className={ classnames( {
							'is-primary': 'hover' === colorMode,
						} ) }
						label={ __( 'Hover State', 'highlight-and-share' ) }
					>
						{ __( 'Hover', 'highlight-and-share' ) }
					</Button>
					<Button
						isSmall={ true }
						onClick={ ( e ) => {
							if ( 'sync' === colorMode ) {
								e.preventDefault();
								return;
							}
							if ( normalColor === hoverColor ) {
								setSyncColor( normalColor );
								setColorMode( 'sync' );
							} else {
								setShowApplyColorSyncModal( true );
							}
						} }
						className={ classnames( {
							'is-primary': 'sync' === colorMode,
						} ) }
						label={ __( 'Sync Normal and Hover Colors', 'highlight-and-share' ) }
					>
						{ __( 'Sync', 'highlight-and-share' ) }
					</Button>
				</div>
				{ 'normal' === colorMode && (
					<ColorPicker
						value={ normalColor }
						props={ props.slug }
						onChange={ ( slug, newValue ) => {
							setNormalColor( newValue );
							props.onChange( newValue, hoverColor, colorMode );
						} }
						label={ props.label }
						defaultColors={ palette }
						defaultColor={ normalColor }
						slug={ props.slug }
					/>
				) }
				{ 'hover' === colorMode && (
					<ColorPicker
						value={ hoverColor }
						props={ props.slug + '-hover' }
						onChange={ ( slug, newValue ) => {
							setHoverColor( newValue );
							props.onChange( normalColor, newValue, colorMode );
						} }
						label={ props.label }
						defaultColors={ palette }
						defaultColor={ hoverColor }
						slug={ props.slug + '-hover' }
					/>
				) }
				{ 'sync' === colorMode && (
					<ColorPicker
						value={ syncColor }
						key={ props.slug + '-sync' }
						onChange={ ( slug, newValue ) => {
							setNormalColor( newValue );
							setHoverColor( newValue );
							setSyncColor( newValue );
							props.onChange( newValue, newValue, colorMode );
						} }
						label={ props.label }
						defaultColors={ palette }
						defaultColor={ syncColor }
						slug={ props.slug + '-sync' }
					/>
				) }
			</div>
			{
				showApplyColorSyncModal && (
					<ApplyColorSyncModal
						syncTitle={ props.syncTitle }
						onOptionSelect={ ( option ) => {
							setColorMode( 'sync' );
							if ( 'normal' === option ) {
								setNormalColor( normalColor );
								setHoverColor( normalColor );
								setSyncColor( normalColor );
								props.onChange( normalColor, normalColor, 'sync' );
							} else if ( 'hover' === option ) {
								setNormalColor( hoverColor );
								setHoverColor( hoverColor );
								setSyncColor( hoverColor );
								props.onChange( hoverColor, hoverColor, 'sync' );
							}
						} }
						onClose={ () => {
							setShowApplyColorSyncModal( false );
						} }
						normalColor={ normalColor }
						hoverColor={ hoverColor }
					/>
				)
			}
		</>
	);
};

export default ColorPickerHoverControl;
