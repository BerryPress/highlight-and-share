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
	{ label: __( 'Background Color', 'highlight-and-share' ), value: 'backgroundColor', syncChange: 'backgroundColorHover' },
	{ label: __( 'Background Color (Hover)', 'highlight-and-share' ), value: 'backgroundColorHover', syncChange: 'backgroundColor' },
	{ label: __( 'Text Color', 'highlight-and-share' ), value: 'textColor', syncChange: 'textColorHover' },
	{ label: __( 'Text Color (Hover)', 'highlight-and-share' ), value: 'textColorHover', syncChange: 'textColor' },
	{ label: __( 'Share Text Color', 'highlight-and-share' ), value: 'shareTextColor', syncChange: 'shareTextColorHover' },
	{ label: __( 'Share Text Color (Hover)', 'highlight-and-share' ), value: 'shareTextColorHover', syncChange: 'shareTextColor' },
	{ label: __( 'Icon Color', 'highlight-and-share' ), value: 'iconColor', syncChange: 'iconColorHover' },
	{ label: __( 'Icon Color (Hover)', 'highlight-and-share' ), value: 'iconColorHover', syncChange: 'iconColor' },
	{ label: __( 'Border Color', 'highlight-and-share' ), value: 'borderColor', syncChange: 'borderColorHover' },
	{ label: __( 'Border Color (Hover)', 'highlight-and-share' ), value: 'borderColorHover', syncChange: 'borderColor' },
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
									slug={ option.value }
									value={ getThemeOverride( option.value, '' ) }
									onChange={ ( _slug, colorValue ) => {
										const keys = syncColors ? [ option.value, option.syncChange ] : option.value;
										setThemeOverride( keys, colorValue );
									} }
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
