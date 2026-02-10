import React, { useRef, useState, useContext } from 'react';
import { Button, Popover, Modal } from '@wordpress/components';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import PresetButton from './ThemeButton';
import CustomPresetsContext from './CustomPresets/context';

const PresetButtonEdit = ( props ) => {
	const {
		title,
		slug,
		setAttributes,
		attributes,
		uniqueId,
		editId,
		clientId,
		saveNonce,
		deleteNonce,
	} = props;
	const uniqueIdAttribute = { uniqueId: slug };
	const blockAttributes = { ...attributes, ...uniqueIdAttribute };
	const { editPresets, setShowEditModal, setShowDeleteModal } = useContext( CustomPresetsContext );

	return (
		<>
			<div
				className={ classNames( 'has-preset-edit-container', {
					'has-preset-edit-container--edit': editPresets,
				} ) }
			>
				{ editPresets && (
					<div className="has-preset-edit-buttons">
						<Button
							variant={ 'secondary' }
							onClick={ ( e ) => {
								setShowEditModal( {
									show: true,
									editId,
									title,
									saveNonce,
								} );
							} }
							label={ __( 'Edit Preset', 'highlight-and-share' ) }
							icon="edit"
							className="has-preset-edit-button"
						/>
						<Button
							variant={ 'secondary' }
							onClick={ ( e ) => {
								setShowDeleteModal( {
									show: true,
									editId,
									deleteNonce,
								} );
							} }
							label={ __( 'Delete Preset', 'highlight-and-share' ) }
							icon="trash"
							className="has-preset-delete-button"
						/>
					</div>
				) }
				<PresetButton
					key={ editId }
					label={
						'' === title ? __( 'Untitled Preset', 'highlight-and-share' ) : title
					}
					setAttributes={ setAttributes }
					uniqueId={ uniqueId }
					className="has-preset-button"
					clientId={ clientId }
					attributes={ blockAttributes }
					disabled={ editPresets }
				/>
			</div>
		</>
	);
};

export default PresetButtonEdit;
