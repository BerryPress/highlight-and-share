/**
 * Headlines panel: feature toggle, heading levels, post types, selectors.
 */

import { __ } from '@wordpress/i18n';
import { Controller, useFormContext } from 'react-hook-form';
import {
	ToggleControl,
	CheckboxControl,
	SelectControl,
	TextareaControl,
} from '@wordpress/components';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import HeadingLevelsControl from './HeadingLevelsControl';
import PostTypesControl from './PostTypesControl';

const SELECTOR_MODE_OPTIONS = [
	{ value: 'inclusion', label: __( 'Inclusion', 'highlight-and-share' ) },
	{ value: 'exclusion', label: __( 'Exclusion', 'highlight-and-share' ) },
];

const HeadlinesPanel = () => {
	const { control } = useFormContext();
	const postTypes = window.hasHeadlinesAdmin?.postTypes ?? [];

	return (
		<ErrorBoundary
			fallback={
				<p>{ __( 'Could not load Headlines panel.', 'highlight-and-share' ) }</p>
			}
		>
			<PanelBodyWithIndicator
				panelId="headlinesSettings"
				title={ __( 'Headlines', 'highlight-and-share' ) }
				defaultOpen={ true }
				className="has-headlines-panel"
				watchFields={ [
					'enableHeadlines',
					'enableH1Sharing',
					'autoGenerateIds',
					'enabledHeadingLevels',
					'supportedPostTypes',
					'selectorMode',
					'inclusionSelectors',
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
									label={ __( 'Enable Headlines Sharing', 'highlight-and-share' ) }
									checked={ !! field.value }
									onChange={ field.onChange }
									help={ __(
										'Show share buttons on section headings. Headings must have IDs for deep linking.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="enableH1Sharing"
							control={ control }
							render={ ( { field } ) => (
								<ToggleControl
									label={ __( 'Enable H1 (Title) Sharing', 'highlight-and-share' ) }
									checked={ !! field.value }
									onChange={ field.onChange }
									help={ __(
										'Add share option to the post title (H1).',
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
									label={ __( 'Auto-Generate Heading IDs', 'highlight-and-share' ) }
									checked={ !! field.value }
									onChange={ field.onChange }
									help={ __(
										'Automatically add IDs to headings that lack them. Required for share links.',
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
								<HeadingLevelsControl value={ field.value } onChange={ field.onChange } />
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
							name="selectorMode"
							control={ control }
							render={ ( { field } ) => (
								<SelectControl
									label={ __( 'Selector Mode', 'highlight-and-share' ) }
									value={ field.value || 'exclusion' }
									options={ SELECTOR_MODE_OPTIONS }
									onChange={ field.onChange }
									help={ __(
										'Inclusion: only headings matching the selectors. Exclusion: all headings except those matching.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="inclusionSelectors"
							control={ control }
							render={ ( { field } ) => (
								<TextareaControl
									label={ __( 'Inclusion Selectors', 'highlight-and-share' ) }
									value={ field.value || '' }
									onChange={ field.onChange }
									help={ __(
										'CSS selectors (comma-separated). Only headings inside matching elements. Used when mode is Inclusion.',
										'highlight-and-share'
									) }
									rows={ 2 }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="exclusionSelectors"
							control={ control }
							render={ ( { field } ) => (
								<TextareaControl
									label={ __( 'Exclusion Selectors', 'highlight-and-share' ) }
									value={ field.value || '' }
									onChange={ field.onChange }
									help={ __(
										'CSS selectors (comma-separated). Headings inside matching elements are skipped. Used when mode is Exclusion.',
										'highlight-and-share'
									) }
									rows={ 2 }
								/>
							) }
						/>
					</div>
				</div>
			</PanelBodyWithIndicator>
		</ErrorBoundary>
	);
};

export default HeadlinesPanel;
