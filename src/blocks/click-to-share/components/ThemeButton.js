import React, { useRef, useState } from 'react';
import { Button, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BlockContent from './BlockContent';

const ThemeButton = ( {
	previewBlock = <></>,
	setAttributes = () => {},
	label = 'Purple',
	slug = 'custom',
	attributes = {},
	uniqueId,
	disabled = false,
	...props
} ) => {
	// Define state for the popover visibility
	const [ showPopover, setShowPopover ] = useState( false );
	const [ popoverAnchor, setPopoverAnchor ] = useState();

	const handlePopoverOpen = () => {
		setShowPopover( true );
	};

	const handlePopoverClose = () => {
		setShowPopover( false );
	};

	const popoverContent = () => {
		const newAttributes = { ...attributes, theme: slug };
		return <BlockContent attributes={ newAttributes } isPreview={ true } />;
	};
	return (
		<>
			<Button
				variant={ 'secondary' }
				onClick={ ( e ) => {
					e.preventDefault();
					setAttributes( { theme: slug } );
				} }
				className="has-preset-button"
				onMouseEnter={ () => handlePopoverOpen( true ) }
				onMouseLeave={ () => handlePopoverClose( false ) }
				label={ label }
				ref={ setPopoverAnchor }
				isPressed={ attributes.theme === slug }
				disabled={ disabled }
			>
				{ label }
			</Button>
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

export default ThemeButton;
