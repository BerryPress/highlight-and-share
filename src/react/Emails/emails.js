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
		};
	};
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
							{ 'form' === getValues('emailSendType') && (
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
									{ __( 'Google reCAPTCHA 3 Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'reCAPTCHA 3 is an invisible captcha and is the least obtrusive option for keeping bots out of your email section.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="recaptchaEnabled"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable reCAPTCHA 3',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable reCAPTCHA 3 to silently discard spammy emails.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{ getValues( 'recaptchaEnabled' ) && (
									<>
										<Controller
											name="recaptchaProjectId"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Recaptcha 3 Project ID', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaProjectId?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Recaptcha 3 Project ID',
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
													label={ __( 'Recaptcha 3 API Key', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaApiKey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Recaptcha 3 API Key',
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
													label={ __( 'Recaptcha 3 Site Key', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaSiteKey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Recaptcha 3 Site Key',
														'comment-edit-pro'
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
														label={ __( 'Set reCAPTCHA Minimum Threshold', 'comment-edit-pro' ) }
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
															'comment-edit-pro'
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
