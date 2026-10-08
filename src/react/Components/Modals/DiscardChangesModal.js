import { Modal, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Discard Changes Modal.
 *
 * @param {Object}   props           Props.
 * @param {Function} props.onConfirm Confirm callback.
 * @param {Function} props.onCancel  Cancel callback.
 * @param {boolean}  props.isOpen    Whether the modal is open.
 * @return {JSX.Element} Discard Changes Modal.
 */
const DiscardChangesModal = ( props ) => {
	const { onConfirm, onCancel, isOpen } = props;

	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Discard Changes', 'highlight-and-share' ) }
			onRequestClose={ () => {
				onCancel();
			} }
			className="has-discard-changes-modal"
			shouldCloseOnClickOutside={ false }
		>
			<p>
				{ __(
					'Are you sure you want to discard your changes? This will reset all your changes back to the last saved version.',
					'highlight-and-share'
				) }
			</p>
			<div className="has-modal-buttons-group">
				<Button
					variant="primary"
					isDestructive={ true }
					onClick={ () => {
						onConfirm();
					} }
				>
					{ __( 'Discard Changes', 'highlight-and-share' ) }
				</Button>
				<Button
					variant="secondary"
					onClick={ () => {
						onCancel();
					} }
				>
					{ __( 'Cancel', 'highlight-and-share' ) }
				</Button>
			</div>
		</Modal>
	);
};

export default DiscardChangesModal;
