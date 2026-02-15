/**
 * DimensionsBlockOverrides – theme override variant of DimensionsControlBlock.
 * Reads/writes themeOverrides[valueKey] as flat { top, right, bottom, left, unit } (no breakpoints).
 */

import { __ } from '@wordpress/i18n';
import DimensionsControlBlock from '../DimensionsBlock';
import { useThemeOverrides } from '../../../blocks/click-to-share/hooks/useThemeOverrides';

const DEFAULT_FLAT = { top: '', right: '', bottom: '', left: '', unit: 'px', unitSync: null };

const flatToValues = ( flat ) => {
	const d = flat && typeof flat === 'object' ? flat : DEFAULT_FLAT;
	const row = {
		top: d.top ?? '',
		right: d.right ?? '',
		bottom: d.bottom ?? '',
		left: d.left ?? '',
		unit: d.unit ?? 'px',
		unitSync: d.unitSync ?? null,
	};
	return {
		desktop: { ...row },
		tablet: { ...row },
		mobile: { ...row },
	};
};

const DimensionsBlockOverrides = ( props ) => {
	const {
		attributes,
		setAttributes,
		valueKey,
		label,
		labelTop = __( 'Top', 'highlight-and-share' ),
		labelRight = __( 'Right', 'highlight-and-share' ),
		labelBottom = __( 'Bottom', 'highlight-and-share' ),
		labelLeft = __( 'Left', 'highlight-and-share' ),
		units = [ 'px', 'em', 'rem' ],
	} = props;

	const { getThemeOverride, setThemeOverride } = useThemeOverrides( attributes, setAttributes );

	const flat = getThemeOverride( valueKey, DEFAULT_FLAT );
	const values = flatToValues( flat );

	const onValuesChange = ( newValues ) => {
		const desktop = newValues.desktop || {};
		setThemeOverride( valueKey, {
			top: desktop.top ?? '',
			right: desktop.right ?? '',
			bottom: desktop.bottom ?? '',
			left: desktop.left ?? '',
			unit: desktop.unit ?? 'px',
			unitSync: desktop.unitSync ?? null,
		} );
	};

	return (
		<DimensionsControlBlock
			label={ label }
			labelTop={ labelTop }
			labelRight={ labelRight }
			labelBottom={ labelBottom }
			labelLeft={ labelLeft }
			values={ values }
			screenSize="Desktop"
			units={ units }
			onValuesChange={ onValuesChange }
		/>
	);
};

export default DimensionsBlockOverrides;
