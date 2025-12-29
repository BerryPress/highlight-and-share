/**
 * Hook for tracking unsaved changes using React Hook Form.
 */

import { useFormState } from 'react-hook-form';

/**
 * Hook to track unsaved changes and validation errors.
 *
 * @param {Object} control React Hook Form control object.
 * @return {Object} Object with isDirty and hasErrors flags.
 */
export default function useUnsavedChanges( control ) {
	const { isDirty, errors } = useFormState( {
		control,
	} );

	const hasErrors = Object.keys( errors ).length > 0;

	return {
		isDirty,
		hasErrors,
		errors,
	};
}

