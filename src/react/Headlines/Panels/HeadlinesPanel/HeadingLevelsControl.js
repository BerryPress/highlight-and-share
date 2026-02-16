/**
 * Heading levels checkbox group for Headlines panel.
 */

import { __ } from '@wordpress/i18n';
import { BaseControl, CheckboxControl } from '@wordpress/components';

const HEADING_LEVELS = [
	{ value: 'h1', label: 'H1' },
	{ value: 'h2', label: 'H2' },
	{ value: 'h3', label: 'H3' },
	{ value: 'h4', label: 'H4' },
	{ value: 'h5', label: 'H5' },
	{ value: 'h6', label: 'H6' },
];

const HeadingLevelsControl = ( { value, onChange } ) => {
	const levels = Array.isArray( value ) ? value : [];

	return (
		<BaseControl
			id="enabledHeadingLevels"
			label={ __( 'Which heading levels get share buttons?', 'highlight-and-share' ) }
			help={ __( 'Select the heading levels that should display share buttons.', 'highlight-and-share' ) }
		>
			<div className="has-headlines-levels-row">
				{ HEADING_LEVELS.map( ( item ) => (
					<CheckboxControl
						key={ item.value }
						label={ item.value.toUpperCase() }
						checked={ levels.includes( item.value ) }
						onChange={ ( checked ) => {
							const next = checked
								? [ ...levels, item.value ]
								: levels.filter( ( l ) => l !== item.value );
							onChange( next );
						} }
					/>
				) ) }
			</div>
		</BaseControl>
	);
};

export default HeadingLevelsControl;
