/**
 * NetworkSelector component - Checkbox grid for selecting social networks.
 */

import { __ } from '@wordpress/i18n';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import { CheckboxControl } from '@wordpress/components';
import SocialIcons from '../../SocialIcons';
import GearIcon from '../../Icons/Gear';

/**
 * NetworkSelector component.
 *
 * @param {Object}   props                 Component props.
 * @param {Object}   props.control         React Hook Form control object.
 * @param {Object}   props.networks        Networks data from PHP.
 * @param {Function} props.onSettingsClick Callback when settings gear icon is clicked.
 * @return {JSX.Element} NetworkSelector component.
 */
const NetworkSelector = ( { control, networks = {}, onSettingsClick } ) => {
	const { getSocialIcon } = SocialIcons( networks );

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
	 * Handle settings button click.
	 *
	 * @param {Event}   e           Click event.
	 * @param {string}  networkSlug Network slug.
	 * @param {boolean} isEnabled   Whether network is enabled.
	 */
	const handleSettingsClick = ( e, networkSlug, isEnabled ) => {
		e.stopPropagation();
		if ( onSettingsClick ) {
			onSettingsClick( networkSlug, isEnabled, e.currentTarget );
		}
	};

	// Get sorted network list.
	const networkList = Object.keys( networks )
		.map( ( slug ) => ( {
			slug,
			...networks[ slug ],
		} ) )
		.sort( ( a, b ) => ( a.order || 0 ) - ( b.order || 0 ) );

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

							return (
								<div
									className={ classNames( 'has-network-selector-item', {
										'is-enabled': isEnabled,
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
										</div>
									</div>
									<div className="has-network-selector-actions">
										<button
											type="button"
											className="has-network-selector-settings-button"
											onClick={ ( e ) =>
												handleSettingsClick( e, network.slug, isEnabled )
											}
											aria-label={ __(
												'Configure network settings',
												'highlight-and-share'
											) }
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

