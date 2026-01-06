/**
 * Display Rules Panel Component.
 *
 * Consolidates display-related settings from the Settings tab into a single collapsible panel.
 * Includes post type exclusion, content area toggles, mobile settings, and text prefix/suffix.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ToggleControl, TextControl } from '@wordpress/components';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import PostTypeSelector from '../../../Components/Shared/PostTypeSelector';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';

/**
 * Display Rules Panel Interface Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Display Rules Panel component.
 */
const Interface = ( { watchFields } ) => {
	// Get form methods from FormProvider context.
	const { control } = useFormContext();

	// Get post types from localization.
	const postTypes = window.hasSharingAdmin?.postTypes || [];

	return (
		<PanelBodyWithIndicator
			title={ __( 'Display Rules - Post Types and Content Areas', 'highlight-and-share' ) }
			initialOpen={ false }
			panelId="display-rules"
			control={ control }
			className="has-sharing-panel"
			watchFields={ watchFields }
		>
			<div className="has-admin-component-wrapper">
				<div className="has-admin-component-row">
					<PostTypeSelector control={ control } postTypes={ postTypes } />
				</div>

				<h3 className="has-admin-content-subheading">
					{ __( 'Content Areas', 'highlight-and-share' ) }
				</h3>

				<div className="has-admin-component-row">
					<Controller
						name="enableContent"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable on the Post Content', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Enabling this option will show the Highlight and Share buttons when users highlight post content.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				<div className="has-admin-component-row">
					<Controller
						name="enableExcerpt"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable on the Post Excerpt', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Enabling this option will show the Highlight and Share buttons when users highlight a post excerpt.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				<div className="has-admin-component-row">
					<Controller
						name="enableComments"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable for the Comments Section', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Enabling this option will show the Highlight and Share buttons when users highlight text in a comment.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				<h3 className="has-admin-content-subheading">
					{ __( 'Mobile Settings', 'highlight-and-share' ) }
				</h3>

				<div className="has-admin-component-row">
					<Controller
						name="enableMobile"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable on Mobile Devices', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Most mobile devices have limited screen real estate. Enable this option to show the Highlight and Share buttons on mobile devices.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				<h3 className="has-admin-content-subheading">
					{ __( 'Text Settings', 'highlight-and-share' ) }
				</h3>

				<div className="has-admin-component-row">
					<Controller
						name="sharingPrefix"
						control={ control }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								type="text"
								label={ __( 'Sharing Text Before', 'highlight-and-share' ) }
								className="has-admin__text-control"
								help={ __(
									'Choose a prefix to go before the sharing text such as a quote.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>

				<div className="has-admin-component-row">
					<Controller
						name="sharingSuffix"
						control={ control }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								type="text"
								label={ __( 'Sharing Text After', 'highlight-and-share' ) }
								className="has-admin__text-control"
								help={ __(
									'Choose a suffix to go after the sharing text such as a quote.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="shortlinks"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Shortlinks', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Enable shortlinks for sharing URLs.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
			</div>
		</PanelBodyWithIndicator>
	);
};

/**
 * Display Rules Panel Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Display Rules Panel with error boundary and suspense.
 */
const DisplayRulesPanel = ( { watchFields } ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Display Rules panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface watchFields={ watchFields } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default DisplayRulesPanel;

