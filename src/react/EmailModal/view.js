/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import {
	TextControl,
	Button,
} from '@wordpress/components';
import { escapeAttribute, escapeEditableHTML } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import Notice from '../Components/Notice';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Loader from '../Components/Loader';
import sendCommand from '../Utils/SendCommand';

// Get URL Query Parameter: type
const emailShareType = hasEmailModal.email_share_type;

const View = () => {
	const [ isSent, setIsSent ] = useState( false );
	const [ isSending, setIsSending ] = useState( false );
	const [ formErrors, setFormErrors ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( false );
	const [ firstNameFieldFocus, setFirstNameFieldFocus ] = useState( false );
	const firstNameField = useRef( null );

	/**
	 * Get a title for the email modal.
	 *
	 * @return {string} The title of the modal.
	 */
	const getModalTitle = () => {
		const modalTitle = hasEmailModal.email_modal_title;
		if ( ! modalTitle ) {
			switch ( emailShareType ) {
				case 'highlight':
					return __( 'Email this Highlight', 'highlight-and-share' );
				case 'quote':
					return __( 'Email this Quote', 'highlight-and-share' );
				case 'selection':
					return __( 'Email this Selection', 'highlight-and-share' );
				default:
					return __( 'Email this Page', 'highlight-and-share' );
			}
		}
		return modalTitle;
	};

	/**
	 * Select first name field upon first load.
	 */
	const selectFirstNameField = () => {
		if ( firstNameField.current && ! firstNameFieldFocus ) {
			firstNameField.current.focus();
			setFirstNameFieldFocus( true );
		}
	};

	useEffect( () => {
		selectFirstNameField();
	}, [] );

	/**
	 * Get a subject for the email modal.
	 *
	 * @return {string} The subject of the email.
	 */
	const getEmailSubject = () => {
		const emailSubject = hasEmailModal.email_modal_subject;
		if ( ! emailSubject ) {
			switch ( emailShareType ) {
				case 'highlight':
					return __( 'Check out this Highlight from {{site_name}}', 'highlight-and-share' );
				case 'quote':
					return __( 'Check out this Quote from {{site_name}}', 'highlight-and-share' );
				case 'selection':
					return __( 'Check out this Text Selection from {{site_name}}', 'highlight-and-share' );
				default:
					return __( 'Check out this page I found from {{site_name}}', 'highlight-and-share' );
			}
		}
		return emailSubject;
	};

	const getDefaultValues = () => {
		return {
			toEmail: '',
			subject: getEmailSubject(),
			recaptchaToken: '',
			nonce: hasEmailModal.nonce,
			permalink: hasEmailModal.permalink,
			shareText: hasEmailModal.share_text,
			postId: hasEmailModal.post_id,
			emailShareType: hasEmailModal.email_share_type,
		};
	};
	const { control, handleSubmit, setValue } =
		useForm( {
			defaultValues: getDefaultValues(),
		} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setIsSending( true );
		setFormErrors( false );
		setErrorMessage( '' );

		// GEt token from Cloudflare if enabled.
		if ( typeof hasCfTurnstileLocal !== 'undefined' ) {
			if ( hasCfTurnstileLocal.turnstile_enabled ) {
				const cfResponse = document.querySelector( 'input[name="cf-turnstile-response"]' );
				if ( null !== cfResponse ) {
					formData.turnstileToken = cfResponse.value;
				}
			}
		}
		// Save stuff here.
		sendCommand( 'has_email_form_submission', {
			formData,
		}, hasEmailModal.ajaxurl ).then( ( ajaxResponse ) => {
			const ajaxData = ajaxResponse.data.data;
			const ajaxSuccess = ajaxResponse.data.success;

			if ( ajaxSuccess ) {
				setIsSent( true );
				// Add slight delay to ensure DOM has updated.

				// Close the modal after showing success message.
				setTimeout(
					() => {
						window.parent.window.hasShareModal.close(); // See src/utils/modal.js for this variable.
					},
					3000
				);
			} else {
				setFormErrors( true );
				setErrorMessage( ajaxData.message );
			}
		} )
			.catch( ( ajaxResponse ) => { } )
			.then( ( ajaxResponse ) => {
				setIsSending( false );
			} );
	};

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	// If the email is sent, show a success message.
	if ( isSent ) {
		return (
			<section className="has-email--notice-wrap">
				<div className="has-email-control-row">
					<Notice
						message={ __( 'The email has been sent.' ) }
						status="success"
						politeness="assertive"
					/>
				</div>
			</section>
		);
	}

	return (
		<section className="has-email--content-wrap">
			<h2>{ getModalTitle() }</h2>
			<form id="has-email-quote-form" onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-email-control-row">
					<Controller
						name="toEmail"
						control={ control }
						shouldUseNativeValidation={true}
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'To (email):', 'highlight-and-share' ) }
								className={ classNames( 'search-has-admin has-admin__text-control', {
									'has-error': 'required' === errors.toEmail?.type,
									'is-required': true,
								} ) }
								register="toEmail"
								type="email"
								required={true}
								placeholder="yourcolleague@friends.com"
								help={ __(
									'Please select who you would like to email.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
					{ 'validate' === errors.toEmail?.type && (
						<Notice
							message={ __( 'The Email is Invalid.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'required' === errors.toEmail?.type && (
						<Notice
							message={ __( 'This is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
				</div>
				<div className="has-email-control-row">
					<Controller
						name="subject"
						control={ control }
						rules={ {
							required: true,
						} }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'Subject:', 'highlight-and-share' ) }
								className={ classNames( 'search-has-admin has-admin__text-control', {
									'has-error': 'required' === errors.subject?.type,
									'is-required': true,
								} ) }
								register="subject"
								help={ __(
									'Please enter the subject of the email.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
					{ 'required' === errors.subject?.type && (
						<Notice
							message={ __( 'This is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					<Controller
						name="recaptchaToken"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="recaptchaToken" />
						) }
					/>
					<Controller
						name="postId"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="postId" />
						) }
					/>
					<Controller
						name="nonce"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="nonce" />
						) }
					/>
					<Controller
						name="permalink"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="permalink" />
						) }
					/>
					<Controller
						name="shareText"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="shareText" />
						) }
					/>
					<Controller
						name="shareType"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="shareType" />
						) }
					/>
				</div>
				<div className="has-admin__tabs--content-actions">
					<Button
						id="has-recaptcha-submit"
						className={ classNames(
							'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right g-recaptcha cf-turnstile',
							{ 'has-error': hasErrors() },
							{ 'has-icon': isSending },
							{ 'is-saving': { isSending } }
						) }
						type="button"
						text={
							isSending
								? __( 'Sending…', 'highlight-and-share' )
								: __( 'Send', 'highlight-and-share' )
						}
						iconSize="18"
						iconPosition="right"
						disabled={ isSending || isSent }
						onClick={ ( e ) => {
							// eslint-disable-next-line no-undef
							if (
								hasEmailModal.recaptcha_enabled &&
								typeof grecaptcha !== 'undefined'
							) {
								grecaptcha.enterprise.ready( function() {
									grecaptcha
										.enterprise.execute( hasEmailModal.recaptcha_site_key, {
											action: 'submit',
										} )
										.then( function( token ) {
											setValue( 'recaptchaToken', token );
											e.target.form.dispatchEvent(
												new Event( 'submit', { cancelable: true, bubbles: true } )
											);
										} );
								} );
							} else {
								// This force submits the form.
								e.target.form.dispatchEvent(
									new Event( 'submit', { cancelable: true, bubbles: true } )
								);
							}
						} }
					/>
					<Button
						className={ classNames(
							'qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right'
						) }
						type="button"
						text={
							isSent ? __( 'Close', 'highlight-and-share' ) : __( 'Cancel', 'highlight-and-share' )
						}
						disabled={ isSending }
						onClick={ () => {
							window.parent.window.hasShareModal.close(); // See src/utils/modal.js for this variable.
						} }
					/>
				</div>
				{ hasErrors() && (
					<Notice
						message={ __(
							'There are form validation errors. Please correct them above.'
						) }
						status="error"
						politeness="polite"
					/>
				) }
				{ formErrors && (
					<Notice
						message={ errorMessage }
						status="error"
						politeness="polite"
					/>
				) }
				{ isSent && (
					<Notice
						message={ __( 'The email has been sent.' ) }
						status="success"
						politeness="assertive"
					/>
				) }
			</form>
		</section>
	);
};
export default View;
