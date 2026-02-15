import { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
const { useInnerBlocksProps, store } = wp.blockEditor;
const { __ } = wp.i18n;
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { Button, Tooltip } from '@wordpress/components';
import { rawHandler } from '@wordpress/blocks';

import GetStyles from './GetStyles';
import useDeviceType from '../../../react/Hooks/useDeviceType';
import sanitizeSVG from '../../../react/Utils/sanitize-svg';
import { useThemeOverrides } from '../hooks/useThemeOverrides';

const openBlockInspector = () => {
	// Post/page editor (most common).
	const editPost = dispatch( 'core/edit-post' );

	if ( editPost?.openGeneralSidebar ) {
		editPost.openGeneralSidebar( 'edit-post/block' );
		return;
	}

	// Fallback (some editors use the interface store).
	const iface = dispatch( 'core/interface' );
	if ( iface?.enableComplementaryArea ) {
		// Scope is the editor store key; area is the sidebar.
		iface.enableComplementaryArea( 'core/edit-post', 'edit-post/block' );
	}
};

const BlockContent = ( props ) => {
	const { attributes, setAttributes, isPreview, clientId } = props;

	const [ deviceType ] = useDeviceType( 'Desktop' );

	const innerBlocksRef = useRef( null );

	const { replaceInnerBlocks } =
		useDispatch( store );

	const { selectBlock } = useDispatch( 'core/block-editor' );

	const selectedBlockClientId = useSelect(
		( select ) => select( 'core/block-editor' ).getSelectedBlockClientId(),
		[]
	);

	const selectedBlockRootId = useSelect(
		( select ) =>
			selectedBlockClientId
				? select( 'core/block-editor' ).getBlockRootClientId( selectedBlockClientId )
				: null,
		[ selectedBlockClientId ]
	);

	const isInnerBlockSelected =
		selectedBlockClientId && selectedBlockRootId === clientId;

	const { getThemeOverride } = useThemeOverrides( attributes, setAttributes );

	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'has-click-to-share-text has-click-to-share__share-text',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: [ 'core/paragraph' ],
			template: [ [ 'core/paragraph', { placeholder: __( 'Add your share text here…', 'highlight-and-share' ) } ] ],
			templateInsertUpdatesSelection: false,
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

	// Resolve CTA values: custom theme uses legacy attrs, non-custom uses themeOverrides.
	const isCustomTheme = theme === 'custom';
	const resolvedClickText = isCustomTheme
		? ( clickText || __( 'Click to share', 'highlight-and-share' ) )
		: ( getThemeOverride( 'clickText', __( 'Click to share', 'highlight-and-share' ) ) );
	const resolvedIcon = isCustomTheme
		? icon
		: ( getThemeOverride( 'icon', icon ) || icon );
	const resolvedShowText = isCustomTheme
		? ( typeof showClickToShareText !== 'undefined' && showClickToShareText[ deviceType.toLowerCase() ] )
		: getThemeOverride( 'showClickToShareText', true );
	const resolvedShowIcon = isCustomTheme
		? ( typeof showClickToShareIcon !== 'undefined' && showClickToShareIcon[ deviceType.toLowerCase() ] )
		: getThemeOverride( 'showShareIcon', true );

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
					'has-click-to-share--edit-link-container': isInnerBlockSelected && ! isBlockPreview,
				} ) }
				id={ uniqueId }
			>
				{ isInnerBlockSelected && ! isBlockPreview && (
					<Tooltip
						text={ __( 'Edit Click to Share Settings and View Block Sidebar Options', 'highlight-and-share' ) }
					>
						<Button
							variant="tertiary"
							className="has-edit-share-settings-link"
							onClick={ () => {
								openBlockInspector();
								selectBlock( clientId );
							} }
							aria-label={ __( 'Edit Share Settings', 'highlight-and-share' ) }
						>
							{ __( 'Edit Share Settings', 'highlight-and-share' ) }
						</Button>
					</Tooltip>
				) }
				<div className="has-click-to-share-wrapper">

					{ isBlockPreview && (
						<>
							<div className="has-click-to-share-text has-click-to-share__share-text">
								<p>Vivamus commodo nunc arcu, finibus cursus felis porta a.</p>
							</div>
						</>
					) }
					{ ! isBlockPreview && (
						<>
							<div { ...innerBlockProps } />
						</>
					) }
					<div className="has-click-to-share-cta">
						{ ( resolvedShowText || isBlockPreview ) && (
							<span className="has-click-to-share-cta-text">{ resolvedClickText } </span>
						) }
						{ ( resolvedShowIcon || isBlockPreview ) && resolvedIcon && (
							<span
								className="has-click-to-share-cta-svg has-click-to-share-icon-block-editor"
								dangerouslySetInnerHTML={ { __html: sanitizeSVG( resolvedIcon ) } }
							/>
						) }
					</div>
				</div>
			</div>
		</>
	);
};
export default BlockContent;
