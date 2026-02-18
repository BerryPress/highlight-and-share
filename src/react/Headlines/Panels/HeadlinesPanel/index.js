/**
 * Headlines panel: feature toggle, heading levels, post types, selectors.
 */

import { __ } from '@wordpress/i18n';
import { Controller, useFormContext } from 'react-hook-form';
import { ToggleControl, TextControl } from '@wordpress/components';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import HeadingLevelsControl from './HeadingLevelsControl';
import PostTypesControl from './PostTypesControl';
import Notice from '../../../Components/Notice';
import CircularExclamationIcon from '../../../Components/Icons/CircularExplanation';

const HeadlinesPanel = () => {
	const {
		control,
		clearErrors,
		formState: { errors },
		trigger,
	} = useFormContext();
	const postTypes = window.hasHeadlinesAdmin?.postTypes ?? [];

	return (
		<ErrorBoundary
			fallback={
				<p>{ __( 'Could not load Headlines panel.', 'highlight-and-share' ) }</p>
			}
		>
			<PanelBodyWithIndicator
				panelId="headlinesSettings"
				title={ __(
					'Headlines - Enable and Configure Display Settings',
					'highlight-and-share'
				) }
				defaultOpen={ true }
				scrollAfterOpen={ false }
				className="has-headlines-panel"
				watchFields={ [
					'enableHeadlines',
					'autoGenerateIds',
					'linkIconAlwaysVisible',
					'enabledHeadingLevels',
					'supportedPostTypes',
					'exclusionSelectors',
				] }
			>
				<div className="has-admin-component-wrapper">
					<div className="has-admin-component-row">
						<Controller
							name="enableHeadlines"
							control={ control }
							render={ ( { field } ) => (
								<ToggleControl
									label={ __( 'Enable Headline Sharing', 'highlight-and-share' ) }
									checked={ !! field.value }
									onChange={ field.onChange }
									help={ __(
										'Enable an unobtrusive link icon next to matching headings, which will display share buttons when clicked.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="autoGenerateIds"
							control={ control }
							render={ ( { field } ) => (
								<ToggleControl
									label={ __(
										'Generate Missing Heading IDs',
										'highlight-and-share'
									) }
									checked={ !! field.value }
									onChange={ field.onChange }
									help={ __(
										'Automatically add IDs to headings that lack them. Required for share links to work.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="linkIconAlwaysVisible"
							control={ control }
							render={ ( { field } ) => (
								<ToggleControl
									label={ __( 'Link icon always visible', 'highlight-and-share' ) }
									checked={ !! field.value }
									onChange={ field.onChange }
									help={ __(
										'Show the link icon next to headings at all times. When off, the icon appears on hover or focus.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>

					<h3 className="has-admin-content-subheading">
						{ __( 'Heading Levels', 'highlight-and-share' ) }
					</h3>
					<div className="has-admin-component-row">
						<Controller
							name="enabledHeadingLevels"
							control={ control }
							render={ ( { field } ) => (
								<HeadingLevelsControl
									value={ field.value }
									onChange={ field.onChange }
								/>
							) }
						/>
					</div>

					<h3 className="has-admin-content-subheading">
						{ __( 'Post Types', 'highlight-and-share' ) }
					</h3>
					<div className="has-admin-component-row">
						<Controller
							name="supportedPostTypes"
							control={ control }
							render={ ( { field } ) => (
								<PostTypesControl
									value={ field.value }
									onChange={ field.onChange }
									postTypes={ postTypes }
								/>
							) }
						/>
					</div>

					<h3 className="has-admin-content-subheading">
						{ __( 'Selectors', 'highlight-and-share' ) }
					</h3>
					<div className="has-admin-component-row">
						<Controller
							name="exclusionSelectors"
							control={ control }
							rules={ {
								pattern:
									/^(\.?[^0-9][-_A-Za-z0-9](,? ?\.?[^0-9][-_A-Za-z0-9])?)+$/i,
							} }
							render={ ( { field } ) => (
								<>
									<TextControl
										label={ __( 'Exclusion Selectors', 'highlight-and-share' ) }
										value={ field.value || '' }
										onChange={ ( value ) => {
											clearErrors( 'exclusionSelectors' );
											field.onChange( value );
										} }
										onBlur={ () => {
											trigger( 'exclusionSelectors' );
										} }
										placeholder=".css-class-to-exclude"
										help={ __(
											'CSS selectors (comma-separated). Selector must match a container around the headline, or be on the headline itself. You can also add class `has-headline-exclude` to the headline or its container to exclude it from sharing.',
											'highlight-and-share'
										) }
									/>
									{ 'pattern' === errors?.exclusionSelectors?.type && (
										<Notice
											message={ __(
												'There are invalid characters.',
												'highlight-and-share'
											) }
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
		</ErrorBoundary>
	);
};

export default HeadlinesPanel;
