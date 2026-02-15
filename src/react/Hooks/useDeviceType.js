import { useDispatch, useSelect } from '@wordpress/data';

/* Credits: Forked from GenerateBlocks */

/**
 * Use the current editor device type (Desktop, Tablet, Mobile).
 * Uses core/editor store (WP 6.5+); falls back to core/edit-post for older versions.
 *
 * @return {Array} [ deviceType, setDeviceType ]
 */
export default () => {
	const editorDispatch = useDispatch( 'core/editor' );
	const editPostDispatch = useDispatch( 'core/edit-post' );

	const deviceType = useSelect( ( select ) => {
		const editorStore = select( 'core/editor' );
		if ( typeof editorStore?.getDeviceType === 'function' ) {
			return editorStore.getDeviceType() ?? 'Desktop';
		}
		const editPostStore = select( 'core/edit-post' );
		const legacyGet =
			editPostStore?.__experimentalGetPreviewDeviceType ||
			( () => 'Desktop' );
		return legacyGet() || 'Desktop';
	}, [] );

	const setDeviceType = ( type ) => {
		if ( typeof editorDispatch?.setDeviceType === 'function' ) {
			editorDispatch.setDeviceType( type );
			return;
		}
		const legacySet = editPostDispatch?.__experimentalSetPreviewDeviceType;
		if ( typeof legacySet === 'function' ) {
			legacySet( type );
		}
	};

	return [ deviceType, setDeviceType ];
};
