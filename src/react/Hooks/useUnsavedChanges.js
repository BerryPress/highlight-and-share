/**
 * Hook for tracking unsaved changes using React Hook Form.
 */

import { useFormState } from 'react-hook-form';

/**
 * Hook to track unsaved changes and validation errors.
 *
 * @param {Object} control     React Hook Form control object.
 * @param {Array}  watchFields Fields to watch.
 * @return {Object} Object with isDirty and hasErrors flags.
 */
export default function useUnsavedChanges( control, watchFields = [] ) {
	const { errors, dirtyFields } = useFormState( {
		control,
	} );

	const isDirty = () => {
		return watchFields.some( ( field ) => Object.keys( dirtyFields ).includes( field ) );
	};

	const hasErrors = () => {
		return watchFields.some( ( field ) => Object.keys( errors ).includes( field ) );
	};

	return {
		isDirty: isDirty(),
		hasErrors: hasErrors(),
	};
}
