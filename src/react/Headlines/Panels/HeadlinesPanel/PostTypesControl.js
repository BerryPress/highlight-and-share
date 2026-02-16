/**
 * Post types checkbox group for Headlines panel.
 */

import { __ } from '@wordpress/i18n';
import { BaseControl, CheckboxControl } from '@wordpress/components';

const PostTypesControl = ( { value, onChange, postTypes } ) => {
	const supported = value && typeof value === 'object' ? value : {};

	return (
		<BaseControl
			id="supportedPostTypes"
			label={ __( 'Enable on Post Types', 'highlight-and-share' ) }
			help={ __( 'Select which post types should show headline sharing.', 'highlight-and-share' ) }
		>
			<div className="has-headlines-post-types-row">
				{ ( Array.isArray( postTypes ) ? postTypes : Object.values( postTypes || {} ) ).map( ( pt ) => (
					<CheckboxControl
						key={ pt.value }
						label={ pt.label }
						checked={ !! supported[ pt.value ] }
						onChange={ ( checked ) => {
							onChange( { ...supported, [ pt.value ]: checked } );
						} }
					/>
				) ) }
			</div>
		</BaseControl>
	);
};

export default PostTypesControl;
