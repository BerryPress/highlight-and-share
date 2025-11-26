import React, { useState, Suspense, useRef } from 'react';
import { __, _x } from '@wordpress/i18n';
import { escapeAttribute } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import {
	TextControl,
	Button,
	RangeControl,
	ToggleControl,
	RadioControl,
	SelectControl,
} from '@wordpress/components';
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Spinner from '../Components/Icons/Spinner';
import sendCommand from '../Utils/SendCommand';
import Loader from '../Components/Loader';
import ValidateEmail from '../Validation/ValidateEmail';
import EmailTemplateTags from '../Components/EmailTemplateTags';
import TextAreaControl from '../Components/TextAreaControl';

const ADDITIONAL_TEMPLATE_TAGS = [
	{ name: __( 'From Name', 'highlight-and-share' ), tag: '{{from_name}}' },
	{ name: __( 'From email', 'highlight-and-share' ), tag: '{{from_email}}' },
	{ name: __( 'To email', 'highlight-and-share' ), tag: '{{to_email}}' },
	{ name: __( 'Share Text', 'highlight-and-share' ), tag: '{{share_text}}' },
];

const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_emails_tab', {
		nonce: hasEmailsAdmin.retrieveNonce,
	} );
};

const Emails = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Emails Tab.', 'highlight-and-share' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<div className="has-admin-container-body__content">
						<Loader
							title={ __( 'Email Settings', 'highlight-and-share' ) }
							label={ __( 'Loading…', 'highlight-and-share' ) }
							color="var(--wp-admin-theme-color)"
						/>
					</div>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const Interface = ( props ) => {
	// Get retrieved data.
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ ajaxError, setAjaxError ] = useState( null );
	const [ akismetInstalled ] = useState( data.akismet.isInstalled );
	const [ akismetApiKeyValid ] = useState( data.akismet.apiKeyValid );

	// Set up refs for email template tags.
	const emailSubjectInputRef = useRef( null );
	const emailBodyInputRef = useRef( null );
	const emailModalTitleInputRef = useRef( null );

	const getDefaultValues = () => {
		return {
			akismetEnabled: data.values.akismetEnabled,
			recaptchaEnabled: data.values.recaptchaEnabled,
			recaptchaProjectId: data.values.recaptchaProjectId,
			recaptchaApiKey: data.values.recaptchaApiKey,
			recaptchaSiteKey: data.values.recaptchaSiteKey,
			recaptchaScoreThreshold: data.values.recaptchaScoreThreshold,
			fromName: data.values.fromName,
			fromEmail: data.values.fromEmail,
			emailSendType: data.values.emailSendType,
			emailSubject: data.values.emailSubject,
			emailBody: data.values.emailBody,
			emailModalTitle: data.values.emailModalTitle,
			turnstileEnabled: data.values.turnstileEnabled,
			turnstileSitekey: data.values.turnstileSitekey,
			turnstileSecret: data.values.turnstileSecret,
			turnstileTheme: data.values.turnstileTheme,
			turnstileLanguage: data.values.turnstileLanguage,
			turnstileWidgetSize: data.values.turnstileWidgetSize,
		};
	};
	console.log( getDefaultValues() );
	const { control, handleSubmit, getValues, reset, setError, clearErrors, setValue } = useForm( {
		defaultValues: getDefaultValues(),
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setSaving( true );
		setAjaxError( null );
		sendCommand( 'has_save_emails_tab', {
			nonce: hasEmailsAdmin.saveNonce,
			form_data: formData,
		} )
			.then( ( ajaxResponse ) => {
				console.log( ajaxResponse );
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Reset count.
					reset( ajaxData );
					setIsSaved( true );
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					// Error stuff.
					const { message } = ajaxData;
					setAjaxError( message );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};
	const handleReset = ( e ) => {
		setAjaxError( null );
		setResetting( true );
		sendCommand( 'has_reset_emails_tab', {
			nonce: hasEmailsAdmin.resetNonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Clear form dirty.
					reset( ajaxData );

					setIsReset( true );
					setTimeout( () => {
						setIsReset( false );
					}, 3000 );
				} else {
					// Error stuff.
					const { message } = ajaxData;
					setAjaxError( message );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setResetting( false );
			} );
	};
	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	return (
		<>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-admin-container-body__content">
					<div className="has-admin-content-wrapper">
						<div className="has-admin-content-panel">
							<div className="has-admin-content-heading">
								<h1>
									<span className="has-admin-content-heading-text">
										{ __( 'Email Settings', 'highlight-and-share' ) }
									</span>
								</h1>
								<p className="description">
									{ __(
										'On this screen, you can set the email options such as spam protection when sharing via email.',
										'highlight-and-share'
									) }
								</p>
								{
									( ! getValues( 'recaptchaEnabled' ) && ! getValues( 'turnstileEnabled' ) ) && (
										<Notice
											message={ __( 'The email option will not be available for security reasons until you enable at least one captcha service.', 'highlight-and-share' ) }
											status="error"
											politeness="assertive"
											inline={ false }
										/>
									)
								}
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Email Send Behavior', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'By default, emails are sent via a form. You can change this to mailto to use the user\'s email client.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="emailSendType"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __( 'Email Send Type', 'highlight-and-share' ) }
												selected={ value }
												options={ [
													{ label: __( 'Form', 'highlight-and-share' ), value: 'form' },
													{ label: __( 'Mailto', 'highlight-and-share' ), value: 'mailto' },
												] }
												onChange={ onChange }
											/>
										) }
									/>
								</div>
							</div>
							{ 'form' === getValues( 'emailSendType' ) && (
								<div className="has-admin-content-body">
									<h2 className="has-admin-content-subheading">
										{ __( 'Email Customization', 'highlight-and-share' ) }
									</h2>
									<p className="description">{ __( 'Choose how users see your emails.', 'highlight-and-share' ) }</p>
									<div className="has-admin-component-row">
										<Controller
											name="emailModalTitle"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<div className="has-admin-email-template-tag-row">
													<TextControl
														label={ __( 'Email Modal Title', 'highlight-and-share' ) }
														value={ value }
														onChange={ ( newValue ) => {
															onChange( newValue );
														} }
														className={ classNames( 'has-admin__text-control', {
															'has-error': 'required' === errors.emailModalTitle?.type,
															'is-required': true,
														} ) }
														ref={ emailModalTitleInputRef }
													/>
													<EmailTemplateTags
														onSelect={ ( tag ) => {
															// Focus on the input field.
															emailModalTitleInputRef.current.focus();
															// Insert the tag at the cursor position.
															const cursorPosition = emailModalTitleInputRef.current.selectionStart;
															const newSubject = [
																value.slice( 0, cursorPosition ),
																tag,
																value.slice( cursorPosition ),
															].join( '' );
															setValue( 'emailModalTitle', newSubject );
														} }
													/>
												</div>
											) }
										/>
										{ errors.emailSubject && (
											<Notice
												message={ __( 'This field is required.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
									</div>
									<div className="has-admin-component-row">
										<Controller
											name="fromEmail"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'From Email', 'highlight-and-share' ) }
													value={ value }
													onChange={ ( newValue ) => {
														if ( ! ValidateEmail( newValue ) ) {
															setError( 'fromEmail', { shouldFocus: true } );
														} else {
															clearErrors( 'fromEmail' );
														}
														onChange( newValue );
													} }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.fromEmail?.type,
														'is-required': true,
													} ) }
												/>
											) }
										/>
										{ errors.fromEmail && (
											<Notice
												message={ __( 'This does not appear to be a valid email address.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
									</div>
									<div className="has-admin-component-row">
										<Controller
											name="fromName"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'From Name', 'highlight-and-share' ) }
													value={ value }
													onChange={ onChange }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.fromName?.type,
														'is-required': true,
													} ) }
												/>
											) }
										/>
									</div>
									<div className="has-admin-component-row">
										<Controller
											name="emailSubject"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<div className="has-admin-email-template-tag-row">
													<TextControl
														label={ __( 'Email Subject', 'highlight-and-share' ) }
														value={ value }
														onChange={ ( newValue ) => {
															onChange( newValue );
														} }
														className={ classNames( 'has-admin__text-control', {
															'has-error': 'required' === errors.emailSubject?.type,
															'is-required': true,
														} ) }
														ref={ emailSubjectInputRef }
													/>
													<EmailTemplateTags
														onSelect={ ( tag ) => {
															// Focus on the input field.
															emailSubjectInputRef.current.focus();
															// Insert the tag at the cursor position.
															const cursorPosition = emailSubjectInputRef.current.selectionStart;
															const newSubject = [
																value.slice( 0, cursorPosition ),
																tag,
																value.slice( cursorPosition ),
															].join( '' );
															setValue( 'emailSubject', newSubject );
														} }
													/>
												</div>
											) }
										/>
										{ errors.emailSubject && (
											<Notice
												message={ __( 'This field is required.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
									</div>
									<div className="has-admin-component-row">
										<Controller
											name="emailBody"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<div className="has-admin-email-template-tag-row">
													<TextAreaControl
														label={ __( 'Email Body', 'highlight-and-share' ) }
														value={ value }
														onChange={ ( newValue ) => {
															onChange( newValue );
														} }
														className={ classNames( 'has-admin__text-area-control', {
															'has-error': 'required' === errors.emailBody?.type,
															'is-required': true,
														} ) }
														innerRef={ emailBodyInputRef }
													/>
													<EmailTemplateTags
														onSelect={ ( tag ) => {
															// Focus on the input field.
															emailBodyInputRef.current.focus();
															// Insert the tag at the cursor position.
															const cursorPosition = emailBodyInputRef.current.selectionStart;
															const newBody = [
																value.slice( 0, cursorPosition ),
																tag,
																value.slice( cursorPosition ),
															].join( '' );
															setValue( 'emailBody', newBody );
														} }
														additionalTags={ ADDITIONAL_TEMPLATE_TAGS }
													/>
												</div>
											) }
										/>
										{ errors.emailBody && (
											<Notice
												message={ __( 'This field is required.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
									</div>
								</div>
							) }
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Akismet Spam Protection', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Akismet is a spam protection service that is very effective in determining if a particular email is spammy.', 'highlight-and-share' ) }</p>
								{ ( ! akismetInstalled ) && (
									<Notice
										message={ __( 'Akismet is not installed, so this option will have no effect.', 'highlight-and-share' ) }
										status="warning"
										politeness="assertive"
										inline={ false }
										icon={ CircularExclamationIcon }
									/>
								) }
								{ ( akismetInstalled && ! akismetApiKeyValid ) && (
									<Notice
										message={ __( 'Akismet is installed, but it does not appear that the API key for Akismet is valid.', 'highlight-and-share' ) }
										status="error"
										politeness="assertive"
										inline={ false }
										icon={ CircularExclamationIcon }
									/>
								) }
								<div className="has-admin-component-row">
									<Controller
										name="akismetEnabled"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Akismet Spam Protection',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'If you have Akismet enabled, it is recommended to enable Akismet protection',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Google reCAPTCHA Enterprise Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'reCAPTCHA is a visible captcha and is the most popular solution for keeping bots out of your email section.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="recaptchaEnabled"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable reCAPTCHA Enterprise',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable reCAPTCHA to silently discard spammy emails.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								<>
									<Notice
										status="info"
										politeness="polite"
										inline={ false }
									>
										<>
											{ __( 'Need help getting your reCAPTCHA Enterprise credentials?', 'highlight-and-share' ) }{ ' ' }
											<a
												href="https://dlxplugins.com/how-tos/how-to-retrieve-recaptcha-enterprise-site-and-api-keys/"
												target="_blank"
												rel="noopener noreferrer"
											>
												{ __( 'View Our How-To Guide', 'highlight-and-share' ) }
											</a>
										</>
									</Notice>
								</>
								{ getValues( 'recaptchaEnabled' ) && (
									<>
										<Controller
											name="recaptchaProjectId"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'reCAPTCHA Enterprise Project ID', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaProjectId?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Recaptcha Enterprise Project ID',
														'highlight-and-share'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.recaptchaProjectId?.type && (
											<Notice
												message={ __( 'This field is a required field.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="recaptchaApiKey"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'reCAPTCHA Enterprise API Key', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaApiKey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your reCAPTCHA Enterprise API Key',
														'highlight-and-share'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.recaptchaApiKey?.type && (
											<Notice
												message={ __( 'This field is a required field.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="recaptchaSiteKey"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'reCAPTCHA Enterprise Site Key', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaSiteKey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your reCAPTCHA Enterprise Site Key',
														'highlight-and-share'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.recaptchaSiteKey?.type && (
											<Notice
												message={ __( 'This field is a required field.' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="recaptchaScoreThreshold"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<>
													<RangeControl
														label={ __( 'Set reCAPTCHA Minimum Threshold', 'highlight-and-share' ) }
														step={ 0.05 }
														value={ parseFloat( value ) }
														max={ 1 }
														min={ 0 }
														currentInput={ value }
														initialPosition={ value }
														allowReset={ true }
														className="has-admin__range-control"
														onChange={ ( recaptchaThreshold ) => {
															onChange( recaptchaThreshold );
														} }
														help={ __(
															'The threshold score is between 0 and 1. The higher the score, the higher the chance of a successful reCAPTCHA challenge. The default value is 0.5. Meaning that the reCAPTCHA challenge will succeed if the score is greater than or equal to 0.5.',
															'highlight-and-share'
														) }
														trackColor="#4F4F4F"
														railColor="#CECECE"
													/>
												</>
											) }
										/>
									</>
								) }
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Cloudflare Turnstile Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Turnstile is a captcha service that is the least obtrusive option for keeping bots out of your email section. It is free from Cloudflare, and does not require you to host with them.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="turnstileEnabled"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Turnstile',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable Turnstile to silently discard spammy emails.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								<>
									<Notice
										status="info"
										politeness="polite"
										inline={ false }
									>
										<>
											{ __( 'Need help getting your Turnstile credentials?', 'highlight-and-share' ) }{ ' ' }
											<a
												href="https://dlxplugins.com/how-tos/how-to-retrieve-your-cloudflare-turnstile-site-and-secret-keys/"
												target="_blank"
												rel="noopener noreferrer"
											>
												{ __( 'View Our How-To Guide', 'highlight-and-share' ) }
											</a>
										</>
									</Notice>
								</>
								{ getValues( 'turnstileEnabled' ) && (
									<>
										<div className="has-admin-component-row">
											<Controller
												name="turnstileSitekey"
												control={ control }
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														label={ __( 'Turnstile Site Key', 'highlight-and-share' ) }
														{ ...field }
														className={ classNames( 'has-admin__text-control', {
															'has-error': 'required' === errors.turnstileSitekey?.type,
															'is-required': true,
														} ) }
														help={ __(
															'Enter your Turnstile Site Key',
															'highlight-and-share'
														) }
														aria-required="true"
													/>
												) }
											/>
											{ 'required' === errors.turnstileSitekey?.type && (
												<Notice
													message={ __( 'This field is a required field.' ) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
										</div>
										<div className="has-admin-component-row">
											<Controller
												name="turnstileSecret"
												control={ control }
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														label={ __( 'Turnstile Secret Key', 'highlight-and-share' ) }
														{ ...field }
														className={ classNames( 'has-admin__text-control', {
															'has-error': 'required' === errors.turnstileSecret?.type,
															'is-required': true,
														} ) }
														help={ __(
															'Enter your Turnstile Secret Key',
															'highlight-and-share'
														) }
														aria-required="true"
													/>
												) }
											/>
											{ 'required' === errors.turnstileSecret?.type && (
												<Notice
													message={ __( 'This field is a required field.' ) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
										</div>
										<div className="has-admin-component-row">
											<Controller
												name="turnstileLanguage"
												control={ control }
												rules={ { required: true } }
												render={ ( { field: { onChange, value } } ) => (
													<SelectControl
														label={ __( 'Widget Language', 'highlight-and-share' ) }
														help={ __(
															'Select the language of the widget.',
															'highlight-and-share'
														) }
														className="has-admin__theme-select"
														value={ value }
														options={ [
															/* auto, ar-eg, de, en, es, fa, fr, id, it, ja, ko, nl, pl, pt-br, ru, tr, zh-cn, zh-tw */
															{ label: __( 'Auto', 'highlight-and-share' ), value: 'auto' },
															{ label: __( 'Arabic', 'highlight-and-share' ), value: 'ar-eg' },
															{ label: __( 'German', 'highlight-and-share' ), value: 'de' },
															{ label: __( 'English', 'highlight-and-share' ), value: 'en' },
															{ label: __( 'Spanish', 'highlight-and-share' ), value: 'es' },
															{ label: __( 'Persian', 'highlight-and-share' ), value: 'fa' },
															{ label: __( 'French', 'highlight-and-share' ), value: 'fr' },
															{ label: __( 'Indonesian', 'highlight-and-share' ), value: 'id' },
															{ label: __( 'Italian', 'highlight-and-share' ), value: 'it' },
															{ label: __( 'Japanese', 'highlight-and-share' ), value: 'ja' },
															{ label: __( 'Korean', 'highlight-and-share' ), value: 'ko' },
															{ label: __( 'Dutch', 'highlight-and-share' ), value: 'nl' },
															{ label: __( 'Polish', 'highlight-and-share' ), value: 'pl' },
															{ label: __( 'Portuguese', 'highlight-and-share' ), value: 'pt-br' },
															{ label: __( 'Russian', 'highlight-and-share' ), value: 'ru' },
															{ label: __( 'Turkish', 'highlight-and-share' ), value: 'tr' },
															{ label: __( 'Chinese (Simplified)', 'highlight-and-share' ), value: 'zh-cn' },
															{ label: __( 'Chinese (Traditional)', 'highlight-and-share' ), value: 'zh-tw' },
														] }
														onChange={ ( widgetLanguageValue ) => {
															onChange( widgetLanguageValue );
														} }
													/>
												) }
											/>
										</div>
										<div className="has-admin-component-row">
											<Controller
												name="turnstileTheme"
												control={ control }
												rules={ { required: true } }
												render={ ( { field: { onChange, value } } ) => (
													<SelectControl
														label={ __( 'Widget Appearance', 'highlight-and-share' ) }
														help={ __(
															'Select the theme for the widget.',
															'highlight-and-share'
														) }
														className="has-admin__theme-select"
														value={ value }
														options={ [
															/* light, dark, auto */
															{ label: __( 'Auto', 'highlight-and-share' ), value: 'auto' },
															{ label: __( 'Light', 'highlight-and-share' ), value: 'light' },
															{ label: __( 'Dark', 'highlight-and-share' ), value: 'dark' },
														] }
														onChange={ ( widgetThemeValue ) => {
															onChange( widgetThemeValue );
														} }
													/>
												) }
											/>
										</div>
										<div className="has-admin-component-row">
											<Controller
												name="turnstileWidgetSize"
												control={ control }
												rules={ { required: true } }
												render={ ( { field: { onChange, value } } ) => (
													<SelectControl
														label={ __( 'Widget Size', 'highlight-and-share' ) }
														help={ __(
															'Select the size for the widget.',
															'highlight-and-share'
														) }
														className="has-admin__theme-select"
														value={ value }
														options={ [
															/* normal, compact */
															{ label: __( 'Normal', 'highlight-and-share' ), value: 'normal' },
															{ label: __( 'Compact', 'highlight-and-share' ), value: 'compact' },
														] }
														onChange={ ( widgetSizeValue ) => {
															onChange( widgetSizeValue );
														} }
													/>
												) }
											/>
										</div>
										{ ( getValues( 'recaptchaEnabled' ) && getValues( 'turnstileEnabled' ) ) && (
											<div className="has-admin-component-row">
												<>
													<Notice
														status="warning"
														politeness="assertive"
														inline={ false }
													>
														<>
															{ __( 'You have both reCAPTCHA Enterprise and Turnstile enabled. This means that both will be used to verify the user\'s email address. If you only want one of them to be used, please disable the other one.', 'highlight-and-share' ) }
														</>
													</Notice>
												</>
											</div>
										) }
									</>
								) }
							</div>
						</div>
						<div className="has-admin__tabs--content-actions">
							<div className="has-admin__tabs--content-actions--left">
								<Button
									className={ classNames(
										'has__btn has__btn-primary has__btn--icon-right',
										{ 'has-error': hasErrors() },
										{ 'has-icon': saving },
										{ 'is-saving': { saving } }
									) }
									type="submit"
									text={
										saving
											? __( 'Saving…', 'highlight-and-share' )
											: __( 'Save Email Settings', 'highlight-and-share' )
									}
									icon={ saving ? Spinner : false }
									iconSize="18"
									iconPosition="right"
									disabled={ saving || resetting }
								/>
							</div>
							<div className="has-admin__tabs--content-actions--right">
								<Button
									className={ classNames(
										'has__btn has__btn-danger has__btn--icon-right',
										{ 'has-icon': resetting },
										{ 'is-resetting': { resetting } }
									) }
									type="button"
									text={
										resetting
											? __( 'Resetting…', 'highlight-and-share' )
											: __( 'Reset Email Settings', 'highlight-and-share' )
									}
									icon={ resetting ? Spinner : false }
									iconSize="18"
									iconPosition="right"
									disabled={ saving || resetting }
									onClick={ ( e ) => {
										setResetting( true );
										handleReset( e );
									} }
								/>
							</div>
						</div>
						{ hasErrors() && (
							<Notice
								message={ __(
									'There are form validation errors. Please correct them above.', 'highlight-and-share'
								) }
								status="error"
								politeness="polite"
							/>
						) }
						{ isSaved && (
							<Notice
								message={ __( 'Your settings have been saved.', 'highlight-and-share' ) }
								status="success"
								politeness="assertive"
							/>
						) }
						{ isReset && (
							<Notice
								message={ __( 'Your settings have been reset to defaults.', 'highlight-and-share' ) }
								status="success"
								politeness="assertive"
							/>
						) }
					</div>
					{ ( null !== ajaxError ) && (
						<Notice
							message={ escapeAttribute( ajaxError ) }
							status="error"
							politeness="assertive"
							inline={ false }
							icon={ CircularExclamationIcon }
						/>
					) }
				</div>
			</form>
		</>
	);
};

export default Emails;
