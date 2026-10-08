import './editor.scss';
import { __ } from '@wordpress/i18n';
import { renderToString, useState } from '@wordpress/element';
import {
	BaseControl,
	TextControl,
	Tooltip,
	Button,
	Popover,
} from '@wordpress/components';
import sanitizeSVG from '../../../../react/Utils/sanitize-svg';

const IconPicker = ( props ) => {
	const [ isCustomIcon, setIsCustomIcon ] = useState( false );
	const [ selectedIcon, setSelectedIcon ] = useState( props.defaultSvg );
	const [ isPopoverVisible, setIsPopOverVisible ] = useState( false );
	const [ isFocusedOutside, setIsFocusedOutside ] = useState( false );

	const { defaultSvg, setAttributes, icons } = props;

	/**
	 * Retrieve popover content for custom icons or regular icons.
	 *
	 * @return {string} Popover content.
	 */
	const getPopoverContent = () => {
		if ( ! isCustomIcon ) {
			return (
				<>
					<ul className="has-icon-list">
						{ Object.keys( icons ).map( ( svg, i ) => {
							return (
								<li key={ `has-icon-${ i }` }>
									<Tooltip text={ icons[ svg ].label }>
										<Button
											className="editor-block-list-item-button"
											onClick={ () => {
												setAttributes( {
													icon: renderToString( icons[ svg ].icon ),
												} );
											} }
										>
											<span className="editor-block-types-list__item-icon">
												{ icons[ svg ].icon }
											</span>
										</Button>
									</Tooltip>
								</li>
							);
						} ) }
					</ul>
					<Button
						className="has-custom-icon-button"
						variant="secondary"
						showTooltip={ true }
						label={ __(
							'Add in a custom SVG instead of selecting an icon.',
							'highlight-and-share'
						) }
						onClick={ () => {
							setIsCustomIcon( true );
						} }
					>
						{ __( 'Set a Custom Icon', 'highlight-and-share' ) }
					</Button>
				</>
			);
		}
		// Return custom icon interface.
		return (
			<>
				<div className="has-custom-icon-preview">
					<span
						dangerouslySetInnerHTML={ { __html: sanitizeSVG( selectedIcon ) } }
					/>
				</div>
				<div className="has-custom-icon-input">
					<TextControl
						label={ __( 'SVG Code', 'highlight-and-share' ) }
						value={ sanitizeSVG( selectedIcon ) }
						onChange={ ( value ) => {
							setSelectedIcon( value );
						} }
					/>
					<Button
						variant="primary"
						onClick={ () => {
							setAttributes( {
								icon: sanitizeSVG( selectedIcon ),
							} );
							setSelectedIcon( selectedIcon );
						} }
					>
						{ __( 'Set Icon', 'highlight-and-share' ) }
					</Button>
					<Button
						variant="tertiary"
						onClick={ () => {
							setIsCustomIcon( false );
						} }
					>
						{ __( 'Back to Icons', 'highlight-and-share' ) }
					</Button>
				</div>
			</>
		);
	};

	const toggleVisible = () => {
		setIsPopOverVisible( ( state ) => ! state );
	};

	return (
		<>
			<BaseControl className="has-icon-wrapper">
				<div className="has-icon-preview">
					<Button
						variant="secondary"
						className="has-icon-preview-button"
						onClick={ ( e ) => {
							if ( isFocusedOutside ) {
								setIsFocusedOutside( false );
								return;
							}
							toggleVisible();
						} }
					>
						<span className="has-icon-preview-button-label">
							{ __( 'Select a Sharing Icon', 'highlight-and-share' ) }
						</span>
						<span dangerouslySetInnerHTML={ { __html: sanitizeSVG( defaultSvg ) } } />
					</Button>
				</div>
			</BaseControl>
			{ isPopoverVisible && (
				<Popover noArrow={ false } className="has-icon-popover" onFocusOutside={ () => {
					setIsFocusedOutside( true );
					setIsPopOverVisible( false );
				} }>
					<BaseControl className="has-icon-picker">
						<h2>{ __( 'Select an Icon', 'highlight-and-share' ) }</h2>
						{ getPopoverContent() }
					</BaseControl>
				</Popover>
			) }
		</>
	);
};
export default IconPicker;
