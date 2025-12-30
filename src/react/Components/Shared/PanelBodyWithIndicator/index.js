/**
 * PanelBody wrapper component with panel indicators for unsaved changes and errors.
 */

import { PanelBody } from '@wordpress/components';
import usePanelState from '../../../Hooks/usePanelState';
import useUnsavedChanges from '../../../Hooks/useUnsavedChanges';

/**
 * PanelBody wrapper with automatic panel indicators.
 *
 * @param {Object}   props             Component props.
 * @param {string}   props.panelId     Unique panel ID for state management.
 * @param {Object}   props.control     React Hook Form control object (optional).
 * @param {Element}  props.title       Panel title (will have indicators added).
 * @param {boolean}  props.defaultOpen Default open state (default: false).
 * @param {string}   props.className   Additional CSS classes.
 * @param {Function} props.onToggle    Custom toggle handler (optional).
 * @param {*}        props.rest        All other PanelBody props.
 * @return {JSX.Element} PanelBody component with indicators.
 */
const PanelBodyWithIndicator = ( {
	panelId,
	control,
	title,
	defaultOpen = false,
	className = '',
	onToggle,
	...rest
} ) => {
	// Panel state management.
	const [ isOpen, setIsOpen ] = usePanelState( panelId, defaultOpen );

	// Track unsaved changes if control is provided.
	const { isDirty, hasErrors } = useUnsavedChanges( control || {} );

	/**
	 * Handle panel toggle.
	 *
	 * @param {boolean} newState New open state.
	 */
	const handleToggle = ( newState ) => {
		setIsOpen( newState );
		if ( onToggle ) {
			onToggle( newState );
		}
	};

	// Build panel title with indicator.
	const panelTitle = (
		<>
			{ title }
			{ control && isDirty && ! hasErrors && (
				<span className="has-panel-indicator has-panel-indicator-dirty" />
			) }
			{ control && hasErrors && (
				<span className="has-panel-indicator has-panel-indicator-error" />
			) }
		</>
	);

	return (
		<PanelBody
			title={ panelTitle }
			initialOpen={ isOpen }
			onToggle={ handleToggle }
			className={ className }
			{ ...rest }
		/>
	);
};

export default PanelBodyWithIndicator;

