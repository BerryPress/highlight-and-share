/**
 * MaxWidthOverrides – theme override variant of MaxWidth.
 * Reads/writes themeOverrides.maximumWidth as flat { width, unit } (no breakpoints).
 * When no override is set, shows empty value with theme maximumWidth as placeholder.
 */

import MaxWidth from '../MaxWidth';
import { useThemeOverrides } from '../../hooks/useThemeOverrides';

const flatToValues = ( flat ) => {
	const isEmpty =
		! flat || typeof flat !== 'object' || flat.width === '' || flat.width === undefined;
	const d = isEmpty
		? { width: '', unit: 'px' }
		: { width: flat.width ?? '', unit: flat.unit ?? 'px' };
	return {
		desktop: { width: d.width ?? '', unit: d.unit ?? 'px' },
		tablet: { width: d.width ?? '', unit: d.unit ?? 'px' },
		mobile: { width: d.width ?? '', unit: d.unit ?? 'px' },
	};
};

const MaxWidthOverrides = ( props ) => {
	const { attributes, setAttributes } = props;
	const { getThemeOverride, setThemeOverride } = useThemeOverrides( attributes, setAttributes );

	const flat = getThemeOverride( 'maximumWidth' );
	const values = flatToValues( flat );

	// Use theme maximumWidth as placeholder when override is empty.
	const themeMaxWidth = attributes.maximumWidth?.desktop?.width;
	const placeholder =
		values.desktop.width === '' && themeMaxWidth ? themeMaxWidth : undefined;

	const onValuesChange = ( newValues ) => {
		const desktop = newValues.desktop || {};
		setThemeOverride( 'maximumWidth', {
			width: desktop.width ?? '',
			unit: desktop.unit ?? 'px',
		} );
	};

	return (
		<MaxWidth
			values={ values }
			screenSize="Desktop"
			onValuesChange={ onValuesChange }
			placeholder={ placeholder }
		/>
	);
};

export default MaxWidthOverrides;
