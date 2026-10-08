import React from 'react';
import shorthandCSS from './ShorthandCSS';

/**
 * Build CSS rules for dimensions and screen size.
 *
 * @param {Object} props      Dimensions array (see /components/DimensionsBlock).
 * @param {string} screenSize mobile|tablet|desktop.
 *
 * @return {string} CSS rules.
 */
export function buildDimensionsCSS( props, screenSize ) {
	screenSize = screenSize.toLowerCase();
	if ( 'undefined' === typeof props ) {
		return '';
	}
	const dimensions = props[ screenSize ];

	if ( 'desktop' === screenSize ) {
		const top = dimensions.top;
		const right = dimensions.right;
		const bottom = dimensions.bottom;
		const left = dimensions.left;
		const unit = dimensions.unit;

		return shorthandCSS( top, right, bottom, left, unit );
	}

	if ( 'tablet' === screenSize || 'mobile' === screenSize ) {
		const top = geHierarchicalPlaceholderValue( props, screenSize, dimensions.top, 'top' );
		const right = geHierarchicalPlaceholderValue( props, screenSize, dimensions.right, 'right' );
		const bottom = geHierarchicalPlaceholderValue( props, screenSize, dimensions.bottom, 'bottom' );
		const left = geHierarchicalPlaceholderValue( props, screenSize, dimensions.left, 'left' );
		const unit = getHierarchicalValueUnit( props, screenSize, dimensions.unit );

		return shorthandCSS( top, right, bottom, left, unit );
	}

	return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (top, right, bottom, left, etc.).
 *
 * @return {string} Value placeholder.
 */
export function geHierarchicalPlaceholderValue( props, screenSize, value, type ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && '' === value ) {
		// Check tablet.
		if ( '' !== props.tablet[ type ] ) {
			return props.tablet[ type ];
		} else if ( '' !== props.desktop[ type ] ) {
			// Check desktop.
			return props.desktop[ type ];
		}
	}

	// Check tablet screen size.
	if ( 'tablet' === screenSize && '' === value ) {
		if ( '' !== props.desktop[ type ] ) {
			// Check desktop.
			return props.desktop[ type ];
		}
	}

	if ( '' !== value ) {
		return value;
	}

	return '0';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {string} Value default or hierarchical value.
 */
export function getHierarchicalValueUnit( props, screenSize, value ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && null === value ) {
		if ( null === props.tablet.unit ) {
			return props.desktop.unit;
		}
		return props.tablet.unit;
	}
	if ( 'tablet' === screenSize && null === value ) {
		return props.desktop.unit;
	}
	if ( null === value ) {
		return 'px';
	}
	return value;
}

/**
 * Get a value based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {boolean} Value default or hierarchical value.
 */
export function getHierarchicalValueUnitSync( props, screenSize, value ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && null === value ) {
		if ( null === props.tablet.unitSync ) {
			return props.desktop.unitSync;
		}
		return props.tablet.unitSync;
	}
	if ( 'tablet' === screenSize && null === value ) {
		return props.desktop.unitSync;
	}
	if ( null === value ) {
		return true;
	}
	return value;
}
