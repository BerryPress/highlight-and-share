import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
const { useInnerBlocksProps, RichText, store } = wp.blockEditor;
import { useDispatch } from '@wordpress/data';

import { rawHandler } from '@wordpress/blocks';

import GetStyles from './GetStyles';
import useDeviceType from '../../../react/Hooks/useDeviceType';
import sanitizeSVG from '../../../react/Utils/sanitize-svg';

const BlockContent = ( props ) => {
	const { attributes, setAttributes, isPreview, clientId } = props;

	const [ deviceType ] = useDeviceType( 'Desktop' );

	const innerBlocksRef = useRef( null );

	const { replaceInnerBlocks } =
		useDispatch( store );

	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'has-click-to-share-text has-click-to-share__share-text',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: [ 'core/paragraph' ],
			template: [ [ 'core/paragraph', { placeholder: '' } ] ],
			templateInsertUpdatesSelection: true,
		}
	);
	const [ isBlockPreview ] = useState( isPreview ?? false );

	const {
		shareText,
		backgroundType,
		clickText,
		uniqueId,
		theme,
		showClickToShareText,
		showClickToShareIcon,
		icon,
	} = attributes;

	/**
	 * Migrate RichText to InnerBlocks.
	 */
	useEffect( () => {
		// Port shareText attribute to use innerBlocks instead.
		if ( shareText !== '' && null !== innerBlocksRef.current && ! isBlockPreview ) {
			// Convert text over to blocks.
			const richTextConvertedToBlocks = rawHandler( { HTML: shareText } );
			replaceInnerBlocks( clientId, richTextConvertedToBlocks );
			setAttributes( { shareText: '' } );
		}
	}, [ innerBlocksRef ] );

	return (
		<>
			{ <GetStyles attributes={ attributes } isPreview={ isBlockPreview } /> }
			<div
				className={ classnames( 'has-click-to-share', `has-theme-${ theme }`, {
					'has-background-color': 'solid' === backgroundType,
					'has-background-gradient': 'gradient' === backgroundType,
					'has-background-image': 'image' === backgroundType,
				} ) }
				id={ uniqueId }
			>
				<div className="has-click-to-share-wrapper">

					{ isBlockPreview && (
						<>
							<div className="has-click-to-share-text has-click-to-share__share-text">
								<p>Vivamus commodo nunc arcu, finibus cursus felis porta a. Nam ultrices, turpis eu fringilla molestie, lorem libero.</p>
							</div>
						</>
					) }
					{ ! isBlockPreview && (
						<>
							<div { ...innerBlockProps } />
						</>
					) }
					<div className="has-click-to-share-cta">
						{ ( ( typeof showClickToShareText !== 'undefined' && showClickToShareText[ deviceType.toLowerCase() ] ) || isBlockPreview ) && <>{ clickText } </> }
						{ ( ( typeof showClickToShareIcon !== 'undefined' && showClickToShareIcon[ deviceType.toLowerCase() ] ) || isBlockPreview ) && (
							<span
								className="has-click-to-share-icon-block-editor"
								dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
							/>
						) }
					</div>
				</div>
			</div>
		</>
	);
};
export default BlockContent;
