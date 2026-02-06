/**
 * Highlight and Share — Document sidebar panel (per-post settings).
 *
 * Registers a PluginDocumentSettingPanel with ToggleGroupControl for
 * Social Sharing via Highlight (Disabled | Default | Enabled). Uses useEntityProp for meta.
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

const META_KEY = '_has_post_settings';
const HIGHLIGHT_SHARING_KEY = 'highlight_sharing';

function HASPostSettingsPanel() {
	const { postType, postId } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		return {
			postType: editor?.getCurrentPostType?.() ?? null,
			postId: editor?.getCurrentPostId?.() ?? null,
		};
	}, [] );

	// Hooks must run unconditionally; use stable defaults when post not yet loaded.
	const [ meta, setMeta ] = useEntityProp(
		'postType',
		postType ?? 'post',
		'meta',
		postId ?? 0
	);

	const supportedPostTypes = window.hasPostSidebar?.supportedPostTypes ?? [ 'post', 'page' ];
	if ( ! postType || ! supportedPostTypes.includes( postType ) || ! postId ) {
		return null;
	}

	const settings = meta?.[ META_KEY ] ?? {};
	const value = settings?.[ HIGHLIGHT_SHARING_KEY ] ?? 'default';

	const updateHighlightSharing = ( newVal ) => {
		setMeta( {
			...( meta || {} ),
			[ META_KEY ]: {
				...( settings || {} ),
				[ HIGHLIGHT_SHARING_KEY ]: newVal,
			},
		} );
	};

	return (
		<PluginDocumentSettingPanel
			name="has-post-settings"
			title={ __( 'Highlight and Share', 'highlight-and-share' ) }
			className="has-post-settings-panel"
		>
			<div className="has-admin-component-wrapper">
				<ToggleGroupControl
					label={ __( 'Social Sharing via Highlight', 'highlight-and-share' ) }
					value={ value }
					onChange={ updateHighlightSharing }
					isBlock
				>
					<ToggleGroupControlOption value="disabled" label={ __( 'Disabled', 'highlight-and-share' ) } />
					<ToggleGroupControlOption value="default" label={ __( 'Default', 'highlight-and-share' ) } />
					<ToggleGroupControlOption value="enabled" label={ __( 'Enabled', 'highlight-and-share' ) } />
				</ToggleGroupControl>
			</div>
		</PluginDocumentSettingPanel>
	);
}

registerPlugin( 'has-post-settings', {
	render: HASPostSettingsPanel,
	icon: 'share',
} );
