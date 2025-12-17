import React from 'react';

const Spinner = ( { width = 24, height = 24, primaryColor = 'currentColor', secondaryColor = 'currentColor', ...props } ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 576 512"
			width={ width }
			height={ height }
			{ ...props }
		>
			<path
				className="fa-primary"
				fill={ primaryColor }
				d="M256 32c0-17.67 14.3-32 32-32 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-8.8 15.3-28.4 20.6-44.6 11.7-14.4-8.8-19.6-28.4-10.8-44.6 16.3-27.3 25.7-60.1 25.7-96 0-106-86-192-192-192-17.7 0-32-13.43-32-32v.9z"
			/>
			<path
				d="M287.1 64c-106 0-192 85.1-192 192 0 106 86 192 192 192 71 0 132.2-37.5 165.8-93.6l.1.1c-6.9 14.9-1.5 32.8 12.1 41.2 16.2 8.9 35.8 3.6 44.6-11.7.2-.3.4-.6.5-.9C466.1 460.1 383.1 512 288 512 146.6 512 32 397.4 32 256S146.6 0 288 0c-17.7 0-32 14.33-32 32s14.3 32 32 32h-.9z"
				fill={ secondaryColor }
				style={ {
					opacity: 0.4,
				} }
			/>
		</svg>
	);
};

export default Spinner;
