import React, { useState } from 'react';
import ApplyColorSyncContext from './context';
import ColorPickerHoverControl from './picker';

const ColorPickerHover = ( props ) => {
	const [ showApplyColorSyncModal, setShowApplyColorSyncModal ] = useState( false );

	return (
		<ApplyColorSyncContext.Provider
			value={ {
				showApplyColorSyncModal,
				setShowApplyColorSyncModal,
			} }
		>
			<ColorPickerHoverControl { ...props } />
		</ApplyColorSyncContext.Provider>
	);
};

export default ColorPickerHover;
