/**
 * Post Type Selector Component.
 *
 * Displays a list of checkboxes for selecting post types to exclude from sharing.
 * All post types are enabled by default; checking a post type excludes it from sharing.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Controller, useFormContext } from 'react-hook-form';
import { BaseControl, CheckboxControl } from '@wordpress/components';

/**
 * Post Type Selector Component.
 *
 * @param {Object} props           Component props.
 * @param {Array}  props.postTypes Array of post type objects with `label` and `value` properties.
 * @return {Element} Post type selector component.
 */
const PostTypeSelector = ( { postTypes = [] } ) => {
	const { control } = useFormContext();

	if ( ! postTypes || postTypes.length === 0 ) {
		return null;
	}
	return (
		<>
			<h3 className="has-admin-content-subheading">{ __( 'Excluded Post Types', 'highlight-and-share' ) }</h3>
			<p className="has-admin-content-subheading-description">{ __( 'Select post types where sharing should be disabled. All post types are enabled by default. You can override these settings on a per-post basis via the post editor\'s Highlight and Share sidebar options.', 'highlight-and-share' ) }</p>
			{ Object.values( postTypes ).map( ( postType ) => (
				<Controller
					key={ postType.value }
					name={ `excludedPostTypes[${ postType.value }]` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => {
						return (
							<CheckboxControl
								label={ postType.label }
								checked={ value || false }
								onChange={ ( isExcluded ) => {
									onChange( isExcluded );
								} }
							/>
						);
					} }
				/>
			) ) }
		</>
	);
};

export default PostTypeSelector;

