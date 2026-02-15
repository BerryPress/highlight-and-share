/**
 * External dependencies
 */

import classnames from 'classnames';
import { useEffect } from 'react';
import ColorPickerHover from './components/ColorPickerHover/index';
import GradientPicker from '../../react/Components/GradientPicker';
import GradientSync from '../../react/Components/GradientSync';
import GradientGenerator from '../../react/Components/GradientGenerator';
import DimensionsControlBlock from '../../react/Components/DimensionsBlock';
import useDeviceType from '../../react/Hooks/useDeviceType';
import Typography from '../../react/Components/Typography';
import BackgroundSelector from '../../react/Components/BackgroundSelector';
/* Preset Imports */
import ThemeButton from './components/ThemeButton';
import { themes } from './themes';
import BlockContent from './components/BlockContent';
import CustomPresets from './components/CustomPresets';
import MaxWidth from './components/MaxWidth';
import IconPicker from './components/IconPicker';
import iconSvgsLegacy from './components/Icons/shareSvgsLegacy';
import iconSvgs from './components/Icons/shareSvgs';
import ThemeColors from './components/ThemeColors';
import TypographyOverrides from '../../react/Components/TypographyOverrides';
import MaxWidthOverrides from './components/MaxWidthOverrides';
import DimensionsBlockOverrides from '../../react/Components/DimensionsBlockOverrides';
import { useThemeOverrides } from './hooks/useThemeOverrides';

const { __ } = wp.i18n;

const {
	PanelBody,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	Popover,
} = wp.components;

const { useState } = wp.element;
const { InspectorControls, useBlockProps, BlockControls } = wp.blockEditor;

const { useInstanceId } = wp.compose;

const HAS_Click_To_Share = ( props ) => {
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const deviceSize = deviceType.toLowerCase();

	const generatedUniqueId = useInstanceId( HAS_Click_To_Share, 'has-cts' );
	const blockProps = useBlockProps( {
		className: classnames( `highlight-and-share`, `align${ align }` ),
	} );
	const [ quoteToolbarPopoverAnchor, setQuoteToolbarPopoverAnchor ] =
		useState( null );
	const [ isQuoteToolbarPopoverOpen, setIsQuoteToolbarPopoverOpen ] =
		useState( false );
	const quoteToolbarTogglePopover = () =>
		setIsQuoteToolbarPopoverOpen( ! isQuoteToolbarPopoverOpen );

	const { attributes, setAttributes, clientId } = props;

	const {
		customShareText,
		shareText,
		backgroundType,
		backgroundColor,
		backgroundColorHover,
		backgroundColorSync,
		backgroundGradient,
		backgroundGradientHover,
		backgroundGradientSync,
		backgroundImage,
		textColor,
		textColorHover,
		textColorSync,
		shareTextColor,
		shareTextColorHover,
		shareTextColorSync,
		showClickToShare,
		showIcon,
		fontSize,
		iconSize,
		clickText,
		padding,
		border,
		borderRadius,
		borderColor,
		iconColor,
		iconColorHover,
		iconColorSync,
		borderColorHover,
		borderColorSync,
		clickShareFontSize,
		maxWidth,
		maxWidthUnit,
		maximumWidth,
		alignment,
		align,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginSize,
		paddingSize,
		borderWidth,
		borderRadiusSize,
		uniqueId,
		typographyQuote,
		typographyShareText,
		showClickToShareText,
		showClickToShareIcon,
		iconSizeResponsive,
		icon,
		theme,
	} = attributes;

	const { getThemeOverride, setThemeOverride } = useThemeOverrides( attributes, setAttributes );

	useEffect( () => {
		// If this is the first time inserting the block.
		if ( '' === uniqueId ) {
			if ( backgroundColor === backgroundColorHover ) {
				setAttributes( { backgroundColorSync: 'sync' } );
			}
			if ( textColor === textColorHover ) {
				setAttributes( { textColorSync: 'sync' } );
			}
			if ( shareTextColor === shareTextColorHover ) {
				setAttributes( { shareTextColorSync: 'sync' } );
			}
			if ( iconColor === iconColorHover ) {
				setAttributes( { iconColorSync: 'sync' } );
			}
			if ( borderColor === borderColorHover ) {
				setAttributes( { borderColorSync: 'sync' } );
			}
			if ( theme === 'custom' ) {
				setAttributes( { theme: 'default' } );
			}
		}
		// Set unique ID for block (for styling).
		setAttributes( { uniqueId: generatedUniqueId } );

		// Port padding to new dimensions object.
		if ( padding !== -1 ) {
			const portPadding = paddingSize;
			portPadding.desktop = {
				top: padding,
				right: padding,
				bottom: padding,
				left: padding,
				unit: 'px',
				unitSync: true,
			};

			setAttributes( {
				paddingSize: portPadding,
				padding: -1,
				backgroundColorHover: backgroundColor,
				shareTextColor: textColor,
				shareTextColorHover: textColor,
				textColorHover: textColor,
				borderColorHover: borderColor,
				iconColorHover: textColor,
				iconColor: textColor,
			} );
		}
		// Port margin to new dimensions object.
		if ( marginTop !== -1 ) {
			const portMargin = marginSize;
			portMargin.desktop = {
				top: marginTop,
				right: marginRight,
				bottom: marginBottom,
				left: marginLeft,
				unit: 'px',
				unitSync: true,
			};
			setAttributes( {
				marginSize: portMargin,
				marginTop: -1,
			} );
		}
		// Port border width to new dimensions object.
		if ( border !== -1 ) {
			const portBorderWidth = borderWidth;
			portBorderWidth.desktop = {
				top: border,
				right: border,
				bottom: border,
				left: border,
				unit: 'px',
				unitSync: true,
			};
			setAttributes( {
				borderWidth: portBorderWidth,
				border: -1,
			} );
		}
		// Port border radius to new dimensions object.
		if ( borderRadius !== -1 ) {
			const portBorderRadius = borderRadiusSize;
			portBorderRadius.desktop = {
				top: borderRadius,
				right: borderRadius,
				bottom: borderRadius,
				left: borderRadius,
				unit: 'px',
				unitSync: true,
			};
			setAttributes( {
				borderRadiusSize: portBorderRadius,
				borderRadius: -1,
			} );
		}

		if ( maxWidth !== '-1' ) {
			setAttributes( { maxWidth: '-1', maxWidthUnit: '-1' } );
		}

		// Port alignment over to align variable.
		if ( alignment !== 'none' ) {
			setAttributes( { align: alignment, alignment: 'none' } );
		}

		// Port over icon size.
		if ( -1 === iconSize ) {
			setAttributes( { iconSize: clickShareFontSize } );
		}

		// Port over show click to share text.
		if ( -1 !== showClickToShare ) {
			const newClickToShareText = {
				mobile: showClickToShare,
				tablet: showClickToShare,
				desktop: showClickToShare,
			};
			setAttributes( {
				showClickToShare: -1,
				showClickToShareText: newClickToShareText,
			} );
		}

		// Port over click to share icon.
		if ( -1 !== showIcon ) {
			const newClickToShareIcon = {
				mobile: showIcon,
				tablet: showIcon,
				desktop: showIcon,
			};
			setAttributes( {
				showIcon: -1,
				showClickToShareIcon: newClickToShareIcon,
			} );
		}

		// If responsive icons is -1, overwrite with iconSize.
		if ( -1 === iconSizeResponsive.desktop ) {
			let newIconSize = 20;
			if ( iconSize !== -1 ) {
				newIconSize = iconSize;
			}
			const newIconResponsive = {
				mobile: newIconSize,
				tablet: newIconSize,
				desktop: newIconSize,
			};
			setAttributes( { iconSizeResponsive: newIconResponsive } );
		}
	}, [] );

	const getDeviceIcon = () => {
		if ( deviceType === 'Desktop' ) {
			return 'laptop';
		} else if ( deviceType === 'Tablet' ) {
			return 'tablet';
		} else if ( deviceType === 'Mobile' ) {
			return 'smartphone';
		}
		return null;
	};

	/* For sticky responsive: forked from GenerateBlocks */
	const panelHeader = document.querySelector(
		'.edit-post-sidebar .edit-post-sidebar__panel-tabs'
	);
	const panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;

	const shareTextToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="editor-quote"
					label={ __( 'Customize the Share Quote', 'highlight-and-share' ) }
					onClick={ quoteToolbarTogglePopover }
					ref={ setQuoteToolbarPopoverAnchor }
				/>
				{ isQuoteToolbarPopoverOpen && (
					<Popover
						placement="right-end"
						anchor={ quoteToolbarPopoverAnchor }
						noArrow={ false }
						className="has-custom-share-text-popover"
					>
						<TextareaControl
							className="has-custom-share-textarea"
							label={ __( 'Custom Share Quote', 'highlight-and-share' ) }
							help={ __(
								'Enter a custom quote to share. This will override what is in the share block.',
								'highlight-and-share'
							) }
							value={ customShareText }
							onChange={ ( value ) => setAttributes( { customShareText: value } ) }
						/>
					</Popover>
				) }
			</ToolbarGroup>
		</BlockControls>
	);

	const getThemeOverridesSidebar = () => {
		return (
			<>
				<PanelBody
					title={ __( 'Share Settings', 'highlight-and-share' ) }
					initialOpen={ true }
				>
					<div className="has-panel-row">
						<ToggleControl
							label={ __( 'Show Click to Share Text', 'highlight-and-share' ) }
							checked={ getThemeOverride( 'showClickToShareText', true ) }
							onChange={ ( value ) => setThemeOverride( 'showClickToShareText', value ) }
						/>
					</div>
					<div className="has-panel-row">
						<TextControl
							label={ __( 'Click to Share Text', 'highlight-and-share' ) }
							value={ getThemeOverride( 'clickText', __( 'Click to share', 'highlight-and-share' ) ) }
							onChange={ ( value ) => setThemeOverride( 'clickText', value ) }
						/>
					</div>
					<div className="has-panel-row">
						<ToggleControl
							label={ __( 'Show Share Icon', 'highlight-and-share' ) }
							checked={ getThemeOverride( 'showShareIcon', true ) }
							onChange={ ( value ) => setThemeOverride( 'showShareIcon', value ) }
						/>
					</div>
					<div className="has-panel-row">
						<RangeControl
							label={ __( 'Icon Size', 'highlight-and-share' ) }
							value={ getThemeOverride( 'iconSize', 20 ) }
							onChange={ ( value ) => setThemeOverride( 'iconSize', value ) }
						/>
					</div>
					<div className="has-panel-row">
						<IconPicker
							defaultSvg={ icon }
							setAttributes={ setAttributes }
							icons={ iconSvgs }
						/>
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'highlight-and-share' ) }
					initialOpen={ false }
				>
					<div className="has-panel-row">
						<ThemeColors
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Typography', 'highlight-and-share' ) }
					initialOpen={ false }
				>
					<div className="has-panel-row has-typography-panel-row">
						<TypographyOverrides
							variant="quote"
							label={ __( 'Quote Typography', 'highlight-and-share' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</div>
					<div className="has-panel-row has-typography-panel-row">
						<TypographyOverrides
							variant="shareText"
							label={ __( 'Share Text Typography', 'highlight-and-share' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Spacing and Border', 'highlight-and-share' ) }
					initialOpen={ false }
				>
					<div className="has-panel-row has-unit-picker">
						<MaxWidthOverrides
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsBlockOverrides
							label={ __( 'Inner Padding', 'highlight-and-share' ) }
							valueKey="innerPadding"
							attributes={ attributes }
							setAttributes={ setAttributes }
							labelTop={ __( 'Top', 'highlight-and-share' ) }
							labelRight={ __( 'Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
							labelLeft={ __( 'Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsBlockOverrides
							label={ __( 'Outer Margin', 'highlight-and-share' ) }
							valueKey="outerMargin"
							attributes={ attributes }
							setAttributes={ setAttributes }
							labelTop={ __( 'Top', 'highlight-and-share' ) }
							labelRight={ __( 'Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
							labelLeft={ __( 'Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsBlockOverrides
							label={ __( 'Border Width', 'highlight-and-share' ) }
							valueKey="borderWidth"
							attributes={ attributes }
							setAttributes={ setAttributes }
							labelTop={ __( 'Top', 'highlight-and-share' ) }
							labelRight={ __( 'Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
							labelLeft={ __( 'Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsBlockOverrides
							label={ __( 'Border Radius', 'highlight-and-share' ) }
							valueKey="borderRadius"
							attributes={ attributes }
							setAttributes={ setAttributes }
							labelTop={ __( 'Top Left', 'highlight-and-share' ) }
							labelRight={ __( 'Top Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
							labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem', '%' ] }
						/>
					</div>
				</PanelBody>
			</>
		);
	};
	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Theme', 'highlight-and-share' ) }
				initialOpen={ true }
				className="has-presets-panel"
				icon="admin-customizer"
			>
				<div className="has-panel-row">
					<div className="has-presets">
						<h3>{ __( 'Select a Theme', 'highlight-and-share' ) }</h3>
						<ButtonGroup>
							{ themes.map( ( themeItem ) => (
								<ThemeButton
									key={ themeItem.id }
									slug={ themeItem.id }
									label={ themeItem.label }
									setAttributes={ setAttributes }
									attributes={ attributes }
									uniqueId={ uniqueId }
								/>
							) ) }
						</ButtonGroup>
					</div>
				</div>
				<div className="has-panel-row">
					<Button
						variant="tertiary"
						isDestructive={ true }
						label={ __( 'Clear Theme Overrides', 'highlight-and-share' ) }
						onClick={ () => setAttributes( { themeOverrides: {} } ) }
					>
						{ __( 'Clear Theme Overrides', 'highlight-and-share' ) }
					</Button>
				</div>
			</PanelBody>
			{ 'custom' !== theme && getThemeOverridesSidebar() }
			{ 'custom' === theme && (
				<PanelBody
					title={ __( 'Share Settings', 'highlight-and-share' ) }
					initialOpen={ true }
					icon={ getDeviceIcon() }
				>
					<div className="has-panel-row">
						<ToggleControl
							label={ __( 'Show Click to Share Text', 'alerts-dlx' ) }
							checked={ showClickToShareText[ deviceType.toLowerCase() ] }
							onChange={ ( value ) => {
								const newShowClickToShare = { ...showClickToShareText };
								newShowClickToShare[ deviceType.toLowerCase() ] = value;
								setAttributes( {
									showClickToShareText: newShowClickToShare,
								} );
							} }
						/>
					</div>
					{ showClickToShareText[ deviceType.toLowerCase() ] &&
						deviceType === 'Desktop' && (
						<div className="has-panel-row">
							<TextControl
								label={ __( 'Click to Share Text', 'highlight-and-share' ) }
								value={ clickText }
								onChange={ ( value ) => {
									setAttributes( { clickText: value } );
								} }
							/>
						</div>
					) }
					<div className="has-panel-row">
						<ToggleControl
							label={ __( 'Show Share Icon', 'alerts-dlx' ) }
							checked={ showClickToShareIcon[ deviceType.toLowerCase() ] }
							onChange={ ( value ) => {
								const newShowClickToShare = { ...showClickToShareIcon };
								newShowClickToShare[ deviceType.toLowerCase() ] = value;
								setAttributes( {
									showClickToShareIcon: newShowClickToShare,
								} );
							} }
						/>
					</div>
					{ showClickToShareIcon[ deviceType.toLowerCase() ] && (
						<>
							{ 'Desktop' === deviceType && (
								<div className="has-panel-row">
									<IconPicker
										defaultSvg={ icon }
										setAttributes={ setAttributes }
										icons={ iconSvgsLegacy }
									/>
								</div>
							) }
							<div className="has-panel-row has-range-control">
								<RangeControl
									label={ __( 'Icon Size', 'highlight-and-share' ) }
									value={ iconSizeResponsive[ deviceType.toLowerCase() ] }
									onChange={ ( value ) => {
										const newIconSize = { ...iconSizeResponsive };
										newIconSize[ deviceType.toLowerCase() ] = value;
										setAttributes( { iconSizeResponsive: newIconSize } );
									} }
									min={ 10 }
									max={ 150 }
									step={ 1 }
								/>
							</div>
						</>
					) }
				</PanelBody>
			) }
			{ deviceType === 'Desktop' && 'custom' === theme && (
				<PanelBody
					title={ __( 'Background Settings', 'highlight-and-share' ) }
					initialOpen={ true }
					icon="admin-appearance"
				>
					<div className="has-panel-row has-background-type">
						<h3>{ __( 'Background Type', 'highlight-and-share' ) }</h3>
						<ButtonGroup>
							<Button
								variant={ backgroundType === 'solid' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( { backgroundType: 'solid' } );
								} }
								label={ __( 'Solid Background', 'highlight-and-share' ) }
							>
								{ __( 'Solid', 'highlight-and-share' ) }
							</Button>
							<Button
								variant={
									backgroundType === 'gradient' ? 'primary' : 'secondary'
								}
								onClick={ ( e ) => {
									setAttributes( { backgroundType: 'gradient' } );
								} }
								label={ __( 'Gradient Background', 'highlight-and-share' ) }
							>
								{ __( 'Gradient', 'highlight-and-share' ) }
							</Button>
							<Button
								variant={ backgroundType === 'image' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( { backgroundType: 'image' } );
								} }
								label={ __( 'Image Background', 'highlight-and-share' ) }
							>
								{ __( 'Image', 'highlight-and-share' ) }
							</Button>
						</ButtonGroup>
					</div>
					{ backgroundType === 'solid' && (
						<>
							<div className="has-panel-row has-color-picker">
								<ColorPickerHover
									syncTitle={ __(
										'Sync Background Colors',
										'highlight-and-share'
									) }
									normalColor={ backgroundColor }
									hoverColor={ backgroundColorHover }
									isSync={ backgroundColorSync }
									onChange={ ( color, hoverColor, sync ) => {
										setAttributes( { backgroundColor: color } );
										setAttributes( { backgroundColorHover: hoverColor } );
										setAttributes( { backgroundColorSync: sync } );
									} }
									label={ __( 'Background Color', 'highlight-and-share' ) }
									key={ 'background-color-solid' }
									slug={ 'background-color-solid' }
								/>
							</div>
						</>
					) }
					{ backgroundType === 'gradient' && (
						<>
							<div className="has-panel-row has-background-gradient-sync">
								<GradientSync
									attributes={ attributes }
									setAttributes={ setAttributes }
									label={ __( 'Sync Gradients', 'highlight-and-share' ) }
								/>
							</div>
							<div className="has-panel-row has-background-gradient">
								<GradientPicker
									value={ backgroundGradient }
									onChange={ ( newValue ) => {
										setAttributes( { backgroundGradient: newValue } );
									} }
									label={ __( 'Gradient Background', 'highlight-and-share' ) }
									clearable={ false }
								/>
							</div>
							<div className="has-panel-row has-background-gradient">
								<GradientPicker
									value={ backgroundGradientHover }
									onChange={ ( newValue ) => {
										setAttributes( { backgroundGradientHover: newValue } );
									} }
									label={ __( 'Gradient Background Hover', 'highlight-and-share' ) }
									clearable={ false }
								/>
							</div>
							<div className="has-panel-row has-background-gradient-generator">
								<GradientGenerator
									setAttributes={ setAttributes }
									label={ __( 'Generate Random Gradient', 'highlight-and-share' ) }
								/>
							</div>
						</>
					) }
					{ backgroundType === 'image' && (
						<>
							<div className="has-panel-row">
								<BackgroundSelector
									label={ __( 'Background Image', 'highlight-and-share' ) }
									values={ backgroundImage }
									onValuesChange={ ( newValue ) => {
										setAttributes( { backgroundImage: newValue } );
									} }
								/>
							</div>
						</>
					) }
				</PanelBody>
			) }
			{ deviceType === 'Desktop' && 'custom' === theme && (
				<PanelBody
					title={ __( 'Colors', 'highlight-and-share' ) }
					initialOpen={ false }
					icon="art"
				>
					<div className="has-panel-row has-color-picker">
						<ColorPickerHover
							syncTitle={ __( 'Sync Text Colors', 'highlight-and-share' ) }
							normalColor={ textColor }
							hoverColor={ textColorHover }
							isSync={ textColorSync }
							onChange={ ( color, hoverColor, sync ) => {
								setAttributes( { textColor: color } );
								setAttributes( { textColorHover: hoverColor } );
								setAttributes( { textColorSync: sync } );
							} }
							label={ __( 'Text Color', 'highlight-and-share' ) }
							key={ 'text-color' }
							slug={ 'text-color' }
						/>
					</div>
					<div className="has-panel-row has-color-picker">
						<ColorPickerHover
							syncTitle={ __( 'Sync Share Text Colors', 'highlight-and-share' ) }
							normalColor={ shareTextColor }
							hoverColor={ shareTextColorHover }
							isSync={ shareTextColorSync }
							onChange={ ( color, hoverColor, sync ) => {
								setAttributes( { shareTextColor: color } );
								setAttributes( { shareTextColorHover: hoverColor } );
								setAttributes( { shareTextColorSync: sync } );
							} }
							label={ __( 'Share Text Color', 'highlight-and-share' ) }
							key={ 'share-text-color' }
							slug={ 'share-text-color' }
						/>
					</div>
					<div className="has-panel-row has-color-picker">
						<ColorPickerHover
							syncTitle={ __( 'Sync Icon Colors', 'highlight-and-share' ) }
							normalColor={ iconColor }
							hoverColor={ iconColorHover }
							isSync={ iconColorSync }
							onChange={ ( color, hoverColor, sync ) => {
								setAttributes( { iconColor: color } );
								setAttributes( { iconColorHover: hoverColor } );
								setAttributes( { iconColorSync: sync } );
							} }
							label={ __( 'Icon Color', 'highlight-and-share' ) }
							key={ 'icon-color' }
							slug={ 'icon-color' }
						/>
					</div>
					<div className="has-panel-row has-color-picker">
						<ColorPickerHover
							syncTitle={ __( 'Sync Border Colors', 'highlight-and-share' ) }
							normalColor={ borderColor }
							hoverColor={ borderColorHover }
							isSync={ borderColorSync }
							onChange={ ( color, hoverColor, sync ) => {
								setAttributes( { borderColor: color } );
								setAttributes( { borderColorHover: hoverColor } );
								setAttributes( { borderColorSync: sync } );
							} }
							label={ __( 'Border Color', 'highlight-and-share' ) }
							key={ 'border-color' }
							slug={ 'border-color' }
						/>
					</div>
				</PanelBody>
			) }
			{ 'custom' === theme && (
				<PanelBody
					title={ __( 'Fonts and Typography', 'highlight-and-share' ) }
					initialOpen={ true }
					icon={ getDeviceIcon() }
				>
					<div className="has-panel-row has-typography-panel-row">
						<Typography
							values={ typographyQuote }
							screenSize={ deviceType }
							onValuesChange={ ( formValues ) => {
								const newTypographyQuote = { ...typographyQuote };
								newTypographyQuote[ deviceType.toLowerCase() ] =
									formValues[ deviceType.toLowerCase() ];
								setAttributes( {
									typographyQuote: newTypographyQuote,
								} );
							} }
							label={ __( 'Quote Typography', 'highlight-and-share' ) }
						/>
					</div>
					<div className="has-panel-row has-typography-panel-row">
						<Typography
							values={ typographyShareText }
							screenSize={ deviceType }
							onValuesChange={ ( formValues ) => {
								setAttributes( {
									typographyShareText: formValues,
								} );
							} }
							label={ __( 'Share Text Typography', 'highlight-and-share' ) }
						/>
					</div>
				</PanelBody>
			) }
			{ 'custom' === theme && (
				<PanelBody
					title={ __( 'Spacing and Border', 'highlight-and-share' ) }
					initialOpen={ true }
					icon={ getDeviceIcon() }
				>
					<div className="has-panel-row has-unit-picker">
						<>
							<MaxWidth
								values={ maximumWidth }
								screenSize={ deviceType }
								onValuesChange={ ( newValues ) => {
									const maxValues = { ...maximumWidth };
									const newValue = newValues[ deviceType.toLowerCase() ];
									if ( newValue ) {
										maxValues[ deviceType.toLowerCase() ] = newValue;
									}
									setAttributes( {
										maximumWidth: maxValues,
									} );
								} }
							/>
						</>
					</div>
					<div className="has-panel-row">
						<DimensionsControlBlock
							label={ __( 'Inner Padding', 'highlight-and-share' ) }
							allowNegatives={ false }
							values={ paddingSize }
							labelTop={ __( 'Top', 'highlight-and-share' ) }
							labelRight={ __( 'Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
							labelLeft={ __( 'Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem' ] }
							screenSize={ deviceType }
							onValuesChange={ ( newValues ) => {
								const newPadding = { ...paddingSize };
								newPadding[ deviceSize ] = newValues[ deviceSize ];
								setAttributes( {
									paddingSize: newPadding,
								} );
							} }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsControlBlock
							label={ __( 'Outer Margin', 'highlight-and-share' ) }
							allowNegatives={ false }
							values={ marginSize }
							labelTop={ __( 'Top', 'highlight-and-share' ) }
							labelRight={ __( 'Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
							labelLeft={ __( 'Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem' ] }
							screenSize={ deviceType }
							onValuesChange={ ( newValues ) => {
								const newMargin = { ...marginSize };
								newMargin[ deviceSize ] = newValues[ deviceSize ];
								setAttributes( {
									marginSize: newMargin,
								} );
							} }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsControlBlock
							label={ __( 'Border Width', 'highlight-and-share' ) }
							allowNegatives={ false }
							values={ borderWidth }
							labelTop={ __( 'Top', 'highlight-and-share' ) }
							labelRight={ __( 'Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
							labelLeft={ __( 'Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem' ] }
							screenSize={ deviceType }
							onValuesChange={ ( newValues ) => {
								const newBorderWidth = { ...borderWidth };
								newBorderWidth[ deviceSize ] = newValues[ deviceSize ];
								setAttributes( {
									borderWidth: newBorderWidth,
								} );
							} }
						/>
					</div>
					<div className="has-panel-row">
						<DimensionsControlBlock
							label={ __( 'Border Radius', 'highlight-and-share' ) }
							allowNegatives={ false }
							values={ borderRadiusSize }
							labelTop={ __( 'Top Left', 'highlight-and-share' ) }
							labelRight={ __( 'Top Right', 'highlight-and-share' ) }
							labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
							labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
							units={ [ 'px', 'em', 'rem', '%' ] }
							screenSize={ deviceType }
							onValuesChange={ ( newValues ) => {
								const newBorderRadius = { ...borderRadiusSize };
								newBorderRadius[ deviceSize ] = newValues[ deviceSize ];
								setAttributes( {
									borderRadiusSize: newBorderRadius,
								} );
							} }
						/>
					</div>
				</PanelBody>
			) }
		</InspectorControls>
	);

	const block = (
		<>
			{ shareTextToolbar }
			{ inspectorControls }
			{
				<BlockContent
					attributes={ attributes }
					setAttributes={ setAttributes }
					clientId={ clientId }
				/>
			}
		</>
	);

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default HAS_Click_To_Share;
