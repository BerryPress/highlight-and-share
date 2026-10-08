import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Popover } from '@wordpress/components';
import TextInsertIcon from '../Icons/TextInsert';

const TEMPLATE_TAGS = [
	{ name: __( 'Site Name', 'highlight-and-share' ), tag: '{{site_name}}' },
	{ name: __( 'Site URL', 'highlight-and-share' ), tag: '{{site_url}}' },
	{ name: __( 'Post title', 'highlight-and-share' ), tag: '{{post_title}}' },
	{ name: __( 'Post excerpt', 'highlight-and-share' ), tag: '{{post_excerpt}}' },
	{ name: __( 'Post URL', 'highlight-and-share' ), tag: '{{post_url}}' },
	{ name: __( 'Share Type', 'highlight-and-share' ), tag: '{{share_type}}' },
	{ name: __( 'Date', 'highlight-and-share' ), tag: '{{date}}' },
];

const EmailTemplateTags = ( { onSelect = () => {}, additionalTags = [] } ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ tags ] = useState( TEMPLATE_TAGS.concat( additionalTags ) );
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );
	const togglePopover = () => setIsOpen( ! isOpen );

	return (
		<>
			<div className="has-email-template-tags">
				<Button
					className="has-icon"
					label={ __( 'Insert Email Template Tag', 'highlight-and-share' ) }
					icon={ TextInsertIcon }
					onClick={ togglePopover }
					ref={ setPopoverAnchor }
				/>
			</div>
			{ isOpen && (
				<Popover
					className="has-email-template-tags__popover"
					placement="right-end"
					onClose={ togglePopover }
					anchor={ popoverAnchor }
					noArrow={ false }
				>
					<ul className="has-email-template-tags__popover-tags">
						{ tags.map( ( tag ) => (
							<li key={ tag.tag }>
								<Button
									onClick={ () => {
										onSelect( tag.tag );
										togglePopover();
									} }
								>
									{ tag.name }
								</Button>
							</li>
						) ) }
					</ul>
				</Popover>
			) }
		</>
	);
};

export default EmailTemplateTags;
