import { useState, useEffect, useRef } from 'react';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import Spinner from '../Icons/Spinner';
import DiscardChangesModal from '../Modals/DiscardChangesModal';
import ResetChangesModal from '../Modals/ResetChangesModal';

/**
 * Save Bar component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onDiscardChanges Discard changes callback.
 * @param {Function} props.onSave           Save callback.
 * @param {Function} props.onReset          Reset callback.
 * @param {boolean}  props.isSaving         Whether the form is saving.
 * @param {boolean}  props.isResetting      Whether the form is resetting.
 * @param {boolean}  props.isDirtyFields    Whether the form is dirty.
 * @param {boolean}  props.hasErrors        Whether the form has errors.
 * @return {JSX.Element} Save Bar component.
 */
const SaveBar = ( props ) => {
	const { onDiscardChanges, onSave, onReset, isSaving = false, isResetting = false, isDirtyFields = false, hasErrors = false } = props;
	const [ isDiscardChangesModalOpen, setIsDiscardChangesModalOpen ] = useState( false );
	const [ isResetChangesModalOpen, setIsResetChangesModalOpen ] = useState( false );
	const saveBarRef = useRef( null );

	useEffect( () => {
		const saveBar = saveBarRef.current;
		if ( ! saveBar ) {
			return;
		}

		const handleTransitionEnd = ( event ) => {
			// Only handle height transitions.
			if ( event.propertyName === 'height' ) {
				if ( isDirtyFields && ! hasErrors ) {
					// After expanding, set to auto so content can grow.
					saveBar.style.height = 'auto';
				}
			}
		};

		saveBar.addEventListener( 'transitionend', handleTransitionEnd );

		if ( isDirtyFields && ! hasErrors ) {
			saveBar.style.opacity = '1';
			saveBar.style.height = '75px';
		} else {
			// When hiding, set to fixed height first, then transition to 0.
			if ( saveBar.style.height === 'auto' ) {
				saveBar.style.height = `${ saveBar.scrollHeight }px`;
				// Force reflow to ensure the height is set before transitioning.
				// eslint-disable-next-line no-unused-expressions
				saveBar.offsetHeight;
			}
			saveBar.style.opacity = '0';
			saveBar.style.height = '0';
		}

		return () => {
			saveBar.removeEventListener( 'transitionend', handleTransitionEnd );
		};
	}, [ saveBarRef, isDirtyFields, hasErrors, isSaving, isResetting ] );
	return (
		<div className="has-admin-save-bar" ref={ saveBarRef } style={ { transition: 'all 0.3s ease-in-out', opacity: 0, height: 0 } }>
			<div className="has-admin__tabs--content-actions">
				<div className="has-admin__tabs--content-actions--left">
					<Button
						variant="primary"
						type="submit"
						className={ classnames(
							'has__btn--icon-right',
							{ 'has-icon': isSaving },
							{ 'is-saving': { isSaving } }
						) }
						text={
							isSaving
								? __( 'Saving…', 'highlight-and-share' )
								: __( 'Save Settings', 'highlight-and-share' )
						}
						icon={ isSaving ? Spinner : false }
						iconSize="18"
						iconPosition="right"
						disabled={ isSaving || isResetting || hasErrors }
						onClick={ ( e ) => {
							e.preventDefault();
							onSave();
						} }
					/>
					<Button
						variant="secondary"
						type="button"
						text={ __( 'Discard Changes', 'highlight-and-share' ) }
						iconSize="18"
						iconPosition="right"
						disabled={ isSaving || isResetting || hasErrors }
						onClick={ ( e ) => {
							e.preventDefault();
							setIsDiscardChangesModalOpen( true );
						} }
					/>
				</div>
				<div className="has-admin__tabs--content-actions--right">
					<Button
						variant="secondary"
						type="button"
						className={ classnames(
							'has__btn--icon-right',
							{ 'has-icon': isResetting },
							{ 'is-resetting': { isResetting } }
						) }
						isDestructive={ true }
						text={ __( 'Reset to Defaults', 'highlight-and-share' ) }
						icon={ isResetting ? Spinner : false }
						iconSize="18"
						iconPosition="right"
						disabled={ isSaving || isResetting || hasErrors }
						onClick={ ( e ) => {
							e.preventDefault();
							setIsResetChangesModalOpen( true );
						} }
					/>
				</div>
			</div>
			<DiscardChangesModal
				isOpen={ isDiscardChangesModalOpen }
				onConfirm={ () => {
					setIsDiscardChangesModalOpen( false );
					onDiscardChanges();
				} }
				onCancel={ () => {
					setIsDiscardChangesModalOpen( false );
				} }
			/>
			<ResetChangesModal
				isOpen={ isResetChangesModalOpen }
				onConfirm={ () => {
					setIsResetChangesModalOpen( false );
					onReset();
				} }
				onCancel={ () => {
					setIsResetChangesModalOpen( false );
				} }
			/>
		</div>
	);
};

export default SaveBar;
