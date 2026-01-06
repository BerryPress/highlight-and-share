/**
 * NetworkSelector component - Checkbox grid for selecting social networks.
 */

import { __ } from '@wordpress/i18n';
import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { CheckboxControl } from '@wordpress/components';
import SocialIcons from '../../SocialIcons';
import GearIcon from '../../Icons/Gear';

/**
 * NetworkSelector component.
 *
 * @param {Object}   props                     Component props.
 * @param {Object}   props.networks            Networks data from PHP.
 * @param {Object}   props.networkErrors       Object mapping network slugs to boolean error state.
 * @param {Function} props.onSettingsMouseDown Callback when settings gear icon is mouse down.
 * @return {JSX.Element} NetworkSelector component.
 */
const NetworkSelector = ( { networks = {}, networkErrors = {}, onSettingsMouseDown } ) => {
	const { getSocialIcon } = SocialIcons( networks );
	const { control } = useFormContext();
	/**
	 * Convert underscore_case to camelCase.
	 *
	 * @param {string} str String in underscore_case.
	 * @return {string} String in camelCase.
	 */
	const toCamelCase = ( str ) => {
		if ( ! str ) {
			return str;
		}
		return str.replace( /_([a-z])/g, ( _, letter ) => letter.toUpperCase() );
	};

	/**
	 * Get the enabled option key for a network.
	 *
	 * @param {string} networkSlug Network slug.
	 * @return {string} Option key for enabled state in camelCase.
	 */
	const getEnabledKey = ( networkSlug ) => {
		const network = networks[ networkSlug ];
		if ( ! network ) {
			return '';
		}
		const optionKey = network.enabled_option_key || `show_${ networkSlug }`;
		// Convert underscore_case to camelCase to match form field names.
		return toCamelCase( optionKey );
	};

	/**
	 * Get network label.
	 *
	 * @param {string} networkSlug Network slug.
	 * @return {string} Network label.
	 */
	const getNetworkLabel = ( networkSlug ) => {
		const network = networks[ networkSlug ];
		if ( ! network ) {
			return networkSlug;
		}
		return network.label || network.label_text || networkSlug;
	};

	/**
	 * Handle network item click.
	 *
	 * @param {string}   networkSlug  Network slug.
	 * @param {boolean}  currentValue Current enabled value.
	 * @param {Function} onChange     Change handler from Controller.
	 */
	const handleItemClick = ( networkSlug, currentValue, onChange ) => {
		onChange( ! currentValue );
	};

	/**
	 * Handle settings button click. Used to close the popover.
	 *
	 * @param {Event} e Click event.
	 */
	const handleSettingsClick = ( e ) => {
		e.stopPropagation();
	};

	/**
	 * Handle settings button mouse down.
	 *
	 * This is used to open the popover when the settings button is clicked
	 * when the mouse is held down.
	 *
	 * @param {Event}  e           Mouse down event.
	 * @param {string} networkSlug Network slug.
	 */
	const handleSettingsMouseDown = ( e, networkSlug ) => {
		e.stopPropagation();
		if ( onSettingsMouseDown ) {
			onSettingsMouseDown( e, networkSlug );
		}
	};

	// Get sorted network list (alphabetically by label).
	const networkList = Object.keys( networks )
		.map( ( slug ) => ( {
			slug,
			...networks[ slug ],
		} ) )
		.sort( ( a, b ) => {
			const labelA = ( a.label || a.label_text || a.slug || '' ).toLowerCase();
			const labelB = ( b.label || b.label_text || b.slug || '' ).toLowerCase();
			return labelA.localeCompare( labelB );
		} );
	return (
		<div className="has-network-selector">
			{ networkList.map( ( network ) => {
				const enabledKey = getEnabledKey( network.slug );
				if ( ! enabledKey ) {
					return null;
				}
				return (
					<Controller
						key={ network.slug }
						name={ enabledKey }
						control={ control }
						render={ ( { field: { onChange, value } } ) => {
							const isEnabled = !! value;
							const networkLabel = getNetworkLabel( network.slug );
							const hasError = networkErrors[ network.slug ] || false;

							return (
								<div
									className={ classNames( 'has-network-selector-item', {
										'is-enabled': isEnabled,
										'has-error-indicator': hasError,
									} ) }
									onClick={ () => handleItemClick( network.slug, isEnabled, onChange ) }
									role="button"
									tabIndex={ 0 }
									onKeyDown={ ( e ) => {
										if ( e.key === 'Enter' || e.key === ' ' ) {
											e.preventDefault();
											handleItemClick( network.slug, isEnabled, onChange );
										}
									} }
								>
									<div className="has-network-selector-checkbox-wrapper">
										<CheckboxControl
											checked={ isEnabled }
											onChange={ onChange }
											label=""
											__nextHasNoMarginBottom
											className="has-network-selector-checkbox"
										/>
									</div>
									<div className="has-network-selector-content">
										<div className="has-network-selector-icon">
											{ getSocialIcon( network.slug ) }
										</div>
										<div className="has-network-selector-label">
											{ networkLabel }
											{ hasError && (
												<span className="has-error-indicator-asterisk" aria-label={ __( 'Validation error', 'highlight-and-share' ) }>
													*
												</span>
											) }
										</div>
									</div>
									<div className="has-network-selector-actions">
										<button
											type="button"
											className="has-network-selector-settings-button"
											onClick={ handleSettingsClick }
											onMouseDown={ ( e ) =>
												handleSettingsMouseDown( e, network.slug )
											}
											aria-label={ __( 'Configure network settings', 'highlight-and-share' ) }
										>
											<GearIcon width={ 16 } height={ 16 } />
										</button>
									</div>
								</div>
							);
						} }
					/>
				);
			} ) }
		</div>
	);
};

export default NetworkSelector;

