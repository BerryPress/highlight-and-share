/**
 * Post Type Selector Component.
 *
 * Displays a list of checkboxes for selecting post types to exclude from sharing.
 * All post types are enabled by default; checking a post type excludes it from sharing.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Controller } from 'react-hook-form';
import { BaseControl, CheckboxControl } from '@wordpress/components';

/**
 * Post Type Selector Component.
 *
 * @param {Object} props           Component props.
 * @param {Object} props.control   React Hook Form control object.
 * @param {Array}  props.postTypes Array of post type objects with `label` and `value` properties.
 * @return {Element} Post type selector component.
 */
const PostTypeSelector = ( { control, postTypes = [] } ) => {
	if ( ! postTypes || postTypes.length === 0 ) {
		return null;
	}

	return (
		<BaseControl
			id="excludedPostTypes"
			label={ __( 'Excluded Post Types', 'highlight-and-share' ) }
			help={ __(
				'Select post types where sharing should be disabled. All post types are enabled by default.',
				'highlight-and-share'
			) }
		>
			{ Object.values( postTypes ).map( ( postType ) => (
				<Controller
					key={ postType.value }
					name={ `excludedPostTypes[${ postType.value }]` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<CheckboxControl
							label={ postType.label }
							checked={ value || false } // Checked = excluded.
							onChange={ ( isExcluded ) => {
								onChange( isExcluded );
							} }
						/>
					) }
				/>
			) ) }
		</BaseControl>
	);
};

export default PostTypeSelector;

