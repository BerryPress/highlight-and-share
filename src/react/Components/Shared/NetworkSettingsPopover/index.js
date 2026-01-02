/**
 * NetworkSettingsPopover component - Popover for network-specific settings.
 */

import { __ } from '@wordpress/i18n';
import { Popover, TextControl, ToggleControl, SelectControl } from '@wordpress/components';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import Notice from '../../Notice';
import CircularExclamationIcon from '../../Icons/CircularExplanation';
import twttr from '../../../Validation/twitter';

/**
 * NetworkSettingsPopover component.
 *
 * @param {Object}   props             Component props.
 * @param {string}   props.networkSlug Network slug.
 * @param {Object}   props.network     Network data.
 * @param {Object}   props.control     React Hook Form control object.
 * @param {Function} props.clearErrors React Hook Form clearErrors function to clear validation errors.
 * @param {Function} props.trigger     React Hook Form trigger function to manually trigger validation.
 * @param {Object}   props.errors      React Hook Form errors object.
 * @param {Function} props.onClose     Callback when popover should close.
 * @param {Object}   props.anchor      Anchor element for popover positioning.
 * @return {JSX.Element} NetworkSettingsPopover component.
 */
const NetworkSettingsPopover = ( {
	networkSlug,
	network,
	control,
	clearErrors,
	trigger, // eslint-disable-line no-unused-vars -- Kept for future use if needed.
	errors,
	onClose,
	anchor,
} ) => {
	if ( ! networkSlug || ! network ) {
		return null;
	}

	/**
	 * Get label field name for network.
	 *
	 * @return {string} Field name.
	 */
	const getLabelFieldName = () => {
		// Special cases.
		if ( networkSlug === 'twitter' ) {
			return 'twitterLabel';
		}
		if ( networkSlug === 'mastodon' ) {
			return 'mastodonLabel';
		}
		// Default pattern.
		return `${ networkSlug }Label`;
	};

	/**
	 * Get tooltip field name for network.
	 *
	 * @return {string} Field name.
	 */
	const getTooltipFieldName = () => {
		// Special cases.
		if ( networkSlug === 'twitter' ) {
			return 'twitterTooltip';
		}
		if ( networkSlug === 'mastodon' ) {
			return 'mastodonTooltip';
		}
		// Default pattern.
		return `${ networkSlug }Tooltip`;
	};

	const labelFieldName = getLabelFieldName();
	const tooltipFieldName = getTooltipFieldName();
	const networkLabel = network.label || network.label_text || networkSlug;

	return (
		<Popover
			anchor={ anchor }
			onClose={ onClose }
			placement="bottom-start"
			className="has-network-settings-popover"
		>
			<div className="has-network-settings-popover-header">
				<h3>{ networkLabel }</h3>
			</div>
			<div className="has-network-settings-popover-content">
				{ /* Label Field */ }
				<Controller
					name={ labelFieldName }
					control={ control }
					rules={ { required: true } }
					shouldUnregister={ false }
					render={ ( { field: { onChange, onBlur, value, name, ref } } ) => (
						<>
							<TextControl
								name={ name }
								value={ value }
								onChange={ ( newValue ) => {
									onChange( newValue );
									// Clear validation errors when user starts typing.
									if ( clearErrors && errors[ name ] ) {
										clearErrors( name );
									}
								} }
								onBlur={ onBlur }
								ref={ ref }
								type="text"
								label={ __( 'Label', 'highlight-and-share' ) }
								className={ classNames( 'has-admin__text-control', {
									'is-required': true,
									'has-error': 'required' === errors[ labelFieldName ]?.type,
								} ) }
								help={ __(
									'Choose a label for this network button.',
									'highlight-and-share'
								) }
								aria-required="true"
							/>
							{ 'required' === errors[ labelFieldName ]?.type && (
								<Notice
									message={ __( 'This field is required.', 'highlight-and-share' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
						</>
					) }
				/>

				{ /* Tooltip Field */ }
				<Controller
					name={ tooltipFieldName }
					control={ control }
					rules={ { required: true } }
					shouldUnregister={ false }
					render={ ( { field: { onChange, onBlur, value, name, ref } } ) => (
						<>
							<TextControl
								name={ name }
								value={ value }
								onChange={ ( newValue ) => {
									onChange( newValue );
									// Clear validation errors when user starts typing.
									if ( clearErrors && errors[ name ] ) {
										clearErrors( name );
									}
								} }
								onBlur={ onBlur }
								ref={ ref }
								type="text"
								label={ __( 'Tooltip', 'highlight-and-share' ) }
								className={ classNames( 'has-admin__text-control', {
									'is-required': true,
									'has-error': 'required' === errors[ tooltipFieldName ]?.type,
								} ) }
								help={ __(
									'Choose tooltip text for this network button.',
									'highlight-and-share'
								) }
								aria-required="true"
							/>
							{ 'required' === errors[ tooltipFieldName ]?.type && (
								<Notice
									message={ __( 'This field is required.', 'highlight-and-share' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
						</>
					) }
				/>

				{ /* Twitter-specific settings */ }
				{ networkSlug === 'twitter' && (
					<>
						<Controller
							name="twitter"
							control={ control }
							rules={ {
								validate: ( value ) => {
									if ( value.length === 0 ) {
										return true;
									}
									return twttr.txt.isValidUsername( '@' + value );
								},
							} }
							shouldUnregister={ false }
							render={ ( { field: { onChange, onBlur, value, name, ref } } ) => (
								<>
									<TextControl
										name={ name }
										value={ value }
										ref={ ref }
										type="text"
										label={ __( 'X Username', 'highlight-and-share' ) }
										className={ classNames( 'has-admin__text-control', {
											'has-error': errors.twitter,
										} ) }
										help={ __(
											'Enter Your X Username without the @ symbol.',
											'highlight-and-share'
										) }
										onChange={ ( currentValue ) => {
											let twitterUsername = '';
											if ( currentValue.length > 0 ) {
												const replacement = currentValue.replace( '@', '' );
												if ( currentValue.length > 0 ) {
													const usernames = twttr.txt.extractMentions(
														'@' + replacement
													);
													if ( typeof usernames[ 0 ] !== 'undefined' ) {
														twitterUsername = usernames[ 0 ];
													} else {
														twitterUsername = replacement;
													}
												}
											}
											onChange( twitterUsername );
											// Clear validation errors when user starts typing.
											if ( clearErrors && errors[ name ] ) {
												clearErrors( name );
											}
										} }
										onBlur={ onBlur }
									/>
									{ 'validate' === errors.twitter?.type && (
										<Notice
											message={ __(
												'The X Username is Invalid.',
												'highlight-and-share'
											) }
											status="error"
											politeness="assertive"
											inline={ false }
											icon={ CircularExclamationIcon }
										/>
									) }
								</>
							) }
						/>

						<Controller
							name="enableHashtags"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __( 'Enable X Hashtags', 'highlight-and-share' ) }
									className="has-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'Hashtags can be set on a post or page in the sidebar.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</>
				) }

				{ /* WhatsApp-specific settings */ }
				{ networkSlug === 'whatsapp' && (
					<>
						<Controller
							name="whatsappApiEndpoint"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<SelectControl
									label={ __( 'WhatsApp Endpoint', 'highlight-and-share' ) }
									value={ value }
									options={ [
										{ label: __( 'App', 'highlight-and-share' ), value: 'app' },
										{ label: __( 'Web', 'highlight-and-share' ), value: 'web' },
									] }
									onChange={ onChange }
									help={ __(
										'Choose whether to use the WhatsApp app or web interface.',
										'highlight-and-share'
									) }
								/>
							) }
						/>

						<Controller
							name="whatsappCanShareUrl"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __( 'Can Share URL', 'highlight-and-share' ) }
									className="has-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'Allow sharing URLs via WhatsApp.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</>
				) }
			</div>
		</Popover>
	);
};

export default NetworkSettingsPopover;

