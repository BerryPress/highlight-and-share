import './editor.scss';
import { useState } from 'react';
import {
	Button,
	Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPicker from '../../../../react/Components/ColorPicker';
import { useThemeOverrides } from '../../hooks/useThemeOverrides';

const colorOptions = [
	{ label: __( 'Background Color', 'highlight-and-share' ), value: 'backgroundColor' },
	{ label: __( 'Background Color (Hover)', 'highlight-and-share' ), value: 'backgroundColorHover' },
	{ label: __( 'Text Color', 'highlight-and-share' ), value: 'textColor' },
	{ label: __( 'Text Color (Hover)', 'highlight-and-share' ), value: 'textColorHover' },
	{ label: __( 'Share Text Color', 'highlight-and-share' ), value: 'shareTextColor' },
	{ label: __( 'Share Text Color (Hover)', 'highlight-and-share' ), value: 'shareTextColorHover' },
	{ label: __( 'Icon Color', 'highlight-and-share' ), value: 'iconColor' },
	{ label: __( 'Icon Color (Hover)', 'highlight-and-share' ), value: 'iconColorHover' },
	{ label: __( 'Border Color', 'highlight-and-share' ), value: 'borderColor' },
	{ label: __( 'Border Color (Hover)', 'highlight-and-share' ), value: 'borderColorHover' },
];

const palette = has_gutenberg.colorPalette;

const ThemeColors = ( props ) => {
	const { attributes, setAttributes } = props;

	const { getThemeOverride, setThemeOverride } = useThemeOverrides( attributes, setAttributes );

	const [ syncColors, setSyncColors ] = useState( false );

	return (
		<>
			<div className="has-panel-row-sync-colors">
				<Tooltip text={ __( 'Sync Normal and Hover Colors when changing colors.', 'highlight-and-share' ) }>
					<Button
						variant="secondary"
						isPressed={ syncColors }
						onClick={ () => {
							setSyncColors( ! syncColors );
						} }
					>
						{ __( 'Sync Color States', 'highlight-and-share' ) }
					</Button>
				</Tooltip>
			</div>
			{
				colorOptions.map( ( option ) => (
					<div className="has-panel-row" key={ option.value }>
						<div className="has-color-row">
							<div className="has-color-row__label">{ option.label }</div>
							<div className="has-color-row__picker">
								<ColorPicker
									value={ getThemeOverride( option.value, '' ) }
									onChange={ ( value ) => setThemeOverride( option.value, value ) }
									defaultColors={ palette }
									defaultColor={ '' }
								/>
							</div>
						</div>
					</div>
				) )
			}
		</>
	);
};

export default ThemeColors;
