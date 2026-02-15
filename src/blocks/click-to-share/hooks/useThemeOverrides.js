/**
 * Hook for reading and writing the themeOverrides block attribute.
 * Returns prefixed keys to avoid collisions with generic names.
 *
 * @param {Object}   attributes    Block attributes.
 * @param {Function} setAttributes Block setAttributes.
 * @return {Object} { themeOverrides, getThemeOverride, setThemeOverride }. getThemeOverride( key, defaultValue ) returns themeOverrides[ key ] ?? defaultValue when provided.
 */

import { useMemo } from '@wordpress/element';

export function useThemeOverrides( attributes, setAttributes ) {
	const themeOverrides = attributes.themeOverrides ?? {};

	const getThemeOverride = useMemo(
		() => ( key, defaultValue ) => themeOverrides[ key ] ?? defaultValue,
		[ themeOverrides ]
	);

	const setThemeOverride = useMemo(
		() => ( key, value ) => {
			if ( value === undefined ) {
				// eslint-disable-next-line no-unused-vars -- omit key from rest.
				const { [ key ]: _, ...rest } = themeOverrides;
				setAttributes( { themeOverrides: rest } );
				return;
			}
			setAttributes( {
				themeOverrides: { ...themeOverrides, [ key ]: value },
			} );
		},
		[ themeOverrides, setAttributes ]
	);

	return {
		themeOverrides,
		getThemeOverride,
		setThemeOverride,
	};
}
