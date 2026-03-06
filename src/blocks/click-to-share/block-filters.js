/**
 * Block filters: adds "Edit Share Settings" to inner block toolbar.
 * When a core/paragraph inside has/click-to-share is selected, shows a toolbar button
 * that switches selection to the parent block.
 */

import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
const hasIcon = (
	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" className="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#F68105" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>
);

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

const withEditShareSettingsToolbar = ( BlockEdit ) => {
	return ( props ) => {
		const { name, clientId } = props;

		if ( 'core/paragraph' !== name ) {
			return <BlockEdit { ...props } />;
		}

		const rootClientId = useSelect(
			( select ) => select( 'core/block-editor' ).getBlockRootClientId( clientId ),
			[ clientId ]
		);

		const rootBlock = useSelect(
			( select ) => ( rootClientId ? select( 'core/block-editor' ).getBlock( rootClientId ) : null ),
			[ rootClientId ]
		);

		const { selectBlock } = useDispatch( 'core/block-editor' );

		if ( ! rootBlock || rootBlock.name !== 'has/click-to-share' ) {
			return <BlockEdit { ...props } />;
		}

		const handleEditShareSettings = () => {
			openBlockInspector();
			selectBlock( rootClientId );
		};

		return (
			<>
				<BlockControls group="default">
					<ToolbarGroup>
						<ToolbarButton
							icon={ hasIcon }
							label={ __( 'Back to Click to Share Settings', 'highlight-and-share' ) }
							onClick={ handleEditShareSettings }
						>
							{ __( 'Settings', 'highlight-and-share' ) }
						</ToolbarButton>
					</ToolbarGroup>
				</BlockControls>
				<BlockEdit { ...props } />
			</>
		);
	};
};

addFilter(
	'editor.BlockEdit',
	'has/click-to-share/edit-share-settings-toolbar',
	withEditShareSettingsToolbar,
);
