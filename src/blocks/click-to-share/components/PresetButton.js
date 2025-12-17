import React, { useRef, useState } from 'react';
import { Button, Popover, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BlockContent from './BlockContent';

const PresetButton = ( {
	previewBlock = <></>,
	setAttributes = () => {},
	label = 'Purple',
	presetData = {},
	attributes = {},
	uniqueId,
	disabled = false,
	...props
} ) => {

	// Define state for the popover visibility
	const [ showPopover, setShowPopover ] = useState( false );
	const [ popoverAnchor, setPopoverAnchor ] = useState();

	// Define state for modal options.
	const [ showModal, setShowModal ] = useState( false );

	const handlePopoverOpen = () => {
		setShowPopover( true );
	};

	const handlePopoverClose = () => {
		setShowPopover( false );
	};

	const popoverContent = () => {
		return <BlockContent attributes={ attributes } isPreview={ true } />;
	};
	return (
		<>
			<Button
				variant={ 'secondary' }
				onClick={ ( e ) => {
					e.preventDefault();
					setShowModal( true );
				} }
				className="has-preset-button"
				onMouseEnter={ () => handlePopoverOpen( true ) }
				onMouseLeave={ () => handlePopoverClose( false ) }
				label={ label }
				ref={ setPopoverAnchor }
				disabled={ disabled }
			>
				{ label }
			</Button>
			{ showModal && (
				<>
					<Modal
						title={ __( 'Apply Preset?', 'highlight-and-share' ) }
						onRequestClose={ () => setShowModal( false ) }
						className="has-preset-modal"
					>
						<p>{ __( 'Are you sure you want to apply this preset?', 'highlight-and-share' ) }</p>
						<Button
							variant="primary"
							onClick={ () => {
								const uniqueIdAttribute = { uniqueId };
								const blockAttributes = { ...attributes, ...uniqueIdAttribute };
								setAttributes( blockAttributes );
								setShowModal( false );
							} }
							className="has-preset-modal-apply-button"
						>
							{ __( 'Apply Preset', 'highlight-and-share' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setShowModal( false );
							} }
						>
							{ __( 'Cancel', 'highlight-and-share' ) }
						</Button>
					</Modal>
				</>
			) }
			{ showPopover && (
				<>
					<Popover
						className="has-preset-popover"
						placement="left"
						onClose={ () => handlePopoverClose( false ) }
						noArrow={ true }
						anchor={ popoverAnchor }
					>
						{ popoverContent() }
					</Popover>
				</>
			) }
		</>
	);
};

export default PresetButton;
