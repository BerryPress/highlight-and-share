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
		() => ( keyOrKeys, value ) => {
			const keys = Array.isArray( keyOrKeys ) ? keyOrKeys : [ keyOrKeys ];
			if ( value === undefined ) {
				const next = Object.fromEntries(
					Object.entries( themeOverrides ).filter( ( [ k ] ) => ! keys.includes( k ) )
				);
				setAttributes( { themeOverrides: next } );
				return;
			}
			const updates = keys.reduce( ( acc, k ) => ( { ...acc, [ k ]: value } ), {} );
			setAttributes( {
				themeOverrides: { ...themeOverrides, ...updates },
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
