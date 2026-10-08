/**
 * Advanced Panel Component.
 *
 * Consolidates advanced settings from the Settings tab into a single collapsible panel.
 * Includes selector settings and shortlinks toggle.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextControl } from '@wordpress/components';
import classnames from 'classnames';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import Notice from '../../../Components/Notice';
import CircularExclamationIcon from '../../../Components/Icons/CircularExplanation';

/**
 * Advanced Panel Interface Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Advanced Panel component.
 */
const Interface = ( { watchFields } ) => {
	// Get form methods from FormProvider context.
	const { control, formState: { errors }, clearErrors } = useFormContext();

	return (
		<PanelBodyWithIndicator
			title={ __( 'Advanced - Selector Settings for Page Builders', 'highlight-and-share' ) }
			initialOpen={ false }
			panelId="advanced"
			control={ control }
			className="has-sharing-panel"
			watchFields={ watchFields }
		>
			<div className="has-admin-component-wrapper">
				<p className="description">
					{ __(
						'These advanced settings allow Highlight and Share to work with your theme, particularly if you are using a page builder. If you are not comfortable with selectors, leave these blank and contact support for assistance.',
						'highlight-and-share'
					) }
				</p>

				<div className="has-admin-component-row">
					<Controller
						name="jsContent"
						control={ control }
						rules={ {
							pattern: /^(\.?[^0-9][-_A-Za-z0-9](,? ?\.?[^0-9][-_A-Za-z0-9])?)+$/i,
						} }
						render={ ( { field } ) => (
							<>
								<TextControl
									{ ...field }
									type="text"
									label={ __( 'CSS Class Selectors', 'highlight-and-share' ) }
									className={ classnames( 'has-admin__text-control', {
										'has-error': 'pattern' === errors.jsContent?.type,
									} ) }
									onChange={ ( value ) => {
										clearErrors( 'jsContent' );
										field.onChange( value );
									} }
									placeholder=".entry-content,.page"
									help={ __(
										'Separate each class with commas. With or without the (.).',
										'highlight-and-share'
									) }
								/>
								{ 'pattern' === errors.jsContent?.type && (
									<Notice
										message={ __( 'There are invalid characters.', 'highlight-and-share' ) }
										status="error"
										politeness="assertive"
										icon={ CircularExclamationIcon }
									/>
								) }
							</>
						) }
					/>
				</div>

				<div className="has-admin-component-row">
					<Controller
						name="idContent"
						control={ control }
						rules={ {
							pattern: /^(\#?[^0-9][-_A-Za-z0-9](,? ?\#?[^0-9][-_A-Za-z0-9])?)+$/i,
						} }
						render={ ( { field } ) => (
							<>
								<TextControl
									{ ...field }
									type="text"
									label={ __( 'CSS ID Selectors', 'highlight-and-share' ) }
									className={ classnames( 'has-admin__text-control', {
										'has-error': 'pattern' === errors.idContent?.type,
									} ) }
									onChange={ ( value ) => {
										clearErrors( 'idContent' );
										field.onChange( value );
									} }
									placeholder="#main,#sidebar"
									help={ __(
										'Separate each ID with commas. With or without the (#).',
										'highlight-and-share'
									) }
								/>
								{ 'pattern' === errors.idContent?.type && (
									<Notice
										message={ __( 'There are invalid characters.', 'highlight-and-share' ) }
										status="error"
										politeness="assertive"
										icon={ CircularExclamationIcon }
									/>
								) }
							</>
						) }
					/>
				</div>

				<div className="has-admin-component-row">
					<Controller
						name="elementContent"
						control={ control }
						rules={ {
							pattern: /^([^0-9][A-Za-z0-9](,? ?[^0-9][A-Za-z0-9])?)+$/i,
						} }
						render={ ( { field } ) => (
							<>
								<TextControl
									{ ...field }
									type="text"
									label={ __( 'HTML Element Selectors', 'highlight-and-share' ) }
									className={ classnames( 'has-admin__text-control', {
										'has-error': 'pattern' === errors.elementContent?.type,
									} ) }
									onChange={ ( value ) => {
										clearErrors( 'elementContent' );
										field.onChange( value );
									} }
									placeholder="main,section,article"
									help={ __(
										'Separate each HTML element selector with commas.',
										'highlight-and-share'
									) }
								/>
								{ 'pattern' === errors.elementContent?.type && (
									<Notice
										message={ __( 'There are invalid characters.', 'highlight-and-share' ) }
										status="error"
										politeness="assertive"
										icon={ CircularExclamationIcon }
									/>
								) }
							</>
						) }
					/>
				</div>

				<div className="has-admin-component-row">
					<Controller
						name="wrapperClasses"
						control={ control }
						rules={ {
							pattern: /^(\.?[^0-9][-_A-Za-z0-9](,? ?\.?[^0-9][-_A-Za-z0-9])?)+$/i,
						} }
						render={ ( { field } ) => (
							<>
								<TextControl
									{ ...field }
									type="text"
									label={ __( 'Post Wrapper Classes', 'highlight-and-share' ) }
									className={ classnames( 'has-admin__text-control', {
										'has-error': 'pattern' === errors.wrapperClasses?.type,
									} ) }
									onChange={ ( value ) => {
										clearErrors( 'wrapperClasses' );
										field.onChange( value );
									} }
									placeholder=".wrapper,.post-content"
									help={ __(
										'Add classes to the Highlight and Share post wrapper. This is useful if you are having any style conflicts with block elements. Separate each class with commas and with or without the (.).',
										'highlight-and-share'
									) }
								/>
								{ 'pattern' === errors.wrapperClasses?.type && (
									<Notice
										message={ __( 'There are invalid characters.', 'highlight-and-share' ) }
										status="error"
										politeness="assertive"
										icon={ CircularExclamationIcon }
									/>
								) }
							</>
						) }
					/>
				</div>
			</div>
		</PanelBodyWithIndicator>
	);
};

/**
 * Advanced Panel Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Advanced Panel with error boundary and suspense.
 */
const AdvancedPanel = ( { watchFields } ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Advanced panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface watchFields={ watchFields } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default AdvancedPanel;

