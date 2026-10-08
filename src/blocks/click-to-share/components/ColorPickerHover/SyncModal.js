import React, { useState, useContext } from 'react';
import {
	ButtonGroup,
	Button,
	Modal,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ApplyColorSyncContext from './context';
import ColorCircle from '../../../../react/Components/Icons/ColorCircle';

const ApplyColorSyncModal = ( props ) => {
	const { hoverColor, normalColor, syncTitle } = props;

	const { showApplyColorSyncModal, setShowApplyColorSyncModal } = useContext( ApplyColorSyncContext );

	return (
		<Modal
			title={ syncTitle }
			onRequestClose={ () => {
				props.onClose();
			} }
			className="has-preset-modal"
			shouldCloseOnClickOutside={ true }
			isDismissible={ true }
		>
			<p className="description">{ __( 'Which color would you like to use as the sync value?', 'highlight-and-share' ) }</p>
			<ButtonGroup className="has-color-sync-modal-button-group">
				<Button
					variant="secondary"
					onClick={ () => {
						props.onOptionSelect( 'normal' );
						setShowApplyColorSyncModal( false );
					} }
					icon={ <ColorCircle style={ { color: normalColor } } /> }
				>
					{ __( 'Use Normal Color', 'highlight-and-share' ) }
				</Button>
				<Button
					variant="secondary"
					onClick={ () => {
						props.onOptionSelect( 'hover' );
						setShowApplyColorSyncModal( false );
					} }
					icon={ <ColorCircle style={ { color: hoverColor } } /> }
				>
					{ __( 'Use Hover Color', 'highlight-and-share' ) }
				</Button>
			</ButtonGroup>
		</Modal>
	);
};
export default ApplyColorSyncModal;
