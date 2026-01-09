import { useEffect, useState, useMemo } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Snackbar as WPSnackBar, Modal, Button } from '@wordpress/components';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import Notice from '../Notice';

/**
 * SnackPop is a component which handles alerts and notifications for the user.
 * It can handle multiple alerts at once, toggles and forms, and will display the notifications in a queue.
 *
 * @param {Object}   props                Component props.
 * @param {boolean}  props.isVisible      Whether the snackbar is visible.
 * @param {string}   props.message        The message to display in the snackbar.
 * @param {string}   props.title          The title of the snackbar.
 * @param {string}   props.type           The type of snackbar to display.
 * @param {boolean}  props.isDismissable  Whether the snackbar is dismissable.
 * @param {boolean}  props.isPersistent   Whether the snackbar is persistent.
 * @param {boolean}  props.isSuccess      Whether the snackbar is a success.
 * @param {string}   props.loadingMessage The message to display when the snackbar is loading.
 * @param {string}   props.politeness     The politeness of the snackbar.
 * @param {Function} props.onClose        The function to call when the snackbar is closed.
 *
 * @return {Element} JSX markup for the component.
 */
const Snackbar = ( props ) => {
	const { loadingMessage } = props;

	const [ isBusy ] = useState( false );
	const [ isModalVisible, setIsModalVisible ] = useState( false );

	useEffect( () => {
		if ( props.isVisible ) {
			setTimeout( () => {
				props.onClose();
			}, 5000 );
		}
	}, [ props.isVisible ] );

	/**
	 * Gets the icon for the notification.
	 *
	 * @return {Element} JSX markup for the icon.
	 */
	const getIcon = () => {
		switch ( props.type ) {
			case 'success':
				return <CheckCircle2 />;
			case 'error':
			case 'critical':
				return <AlertCircle />;
			default:
				return <Loader2 />;
		}
	};

	const getSnackbarActions = () => {
		const actions = [];
		if ( props.type === 'success' ) {
			actions.push( {
				label: __( 'Back to Top', 'highlight-and-share' ),
				url: '#has-admin-header',
				variant: 'link',
				className:
					'dlx-pw-admin__notice-action dlx-pw-admin__notice-action--to-top',
			} );
		}
		return actions;
	};

	const getSnackBar = () => {
		return (
			<WPSnackBar
				className={ classnames(
					`dlx-pw-snackbar dlx-pw-snackbar-${ props.type }`,
					{
						'dlx-pw-snackbar-loading': isBusy,
					}
				) }
				actions={ getSnackbarActions() }
				icon={ getIcon() }
				onDismiss={ () => {
					setIsModalVisible( false );
					props.onClose();
				} }
				explicitDismiss={ props.isDismissable }
			>
				{ isBusy ? loadingMessage : props.message }
			</WPSnackBar>
		);
	};

	const getModal = () => {
		if ( 'critical' === props.type ) {
			return (
				<Modal
					className={ classnames(
						`dlx-pw-modal dlx-pw-modal-${ props.type }`,
						{
							'dlx-pw-modal-loading': isBusy,
						}
					) }
					bodyOpenClassName={ 'dlx-pw-modal-body-open' }
					title={ props.title }
					onRequestClose={ () => {
						setIsModalVisible( false );
					} }
					isDismissible={ true }
					shouldCloseOnClickOutside={ props.isPersistent }
					shouldCloseOnEsc={ props.isPersistent }
				>
					<Notice
						message={ props.message }
						status={ props.type }
						politeness={ props.politeness }
						icon={ getIcon }
						inline={ false }
					/>
					<div className="dlx-pw-modal-button-group">
						<Button
							className="button button-error"
							variant="secondary"
							onClick={ () => {
								setIsModalVisible( false );
							} }
						>
							{ __( 'OK', 'highlight-and-share' ) }
						</Button>
					</div>
				</Modal>
			);
		}
	};

	if ( ! props.isVisible ) {
		return null;
	}

	return (
		<>
			{ getSnackBar() } { /* Show snackbar */ }
			{ isModalVisible && getModal() } { /* Show modal */ }
		</>
	);
};
export default Snackbar;
