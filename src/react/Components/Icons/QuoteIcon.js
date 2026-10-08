import React from 'react';

const QuoteIcon = ( { width = 24, height = 24, fill = '#000000', ...props } ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			width={ width }
			height={ height }
			{ ...props }
		>
			<path
				fill={ fill }
				d="M96 224c-11.28 0-21.95 2.3-32 5.9V224c0-35.3 28.7-64 64-64 17.67 0 32-14.33 32-32s-14.3-32-32-32C57.42 96 0 153.4 0 224v96c0 53.02 42.98 96 96 96s96-42.98 96-96-43-96-96-96zm256 0c-11.28 0-21.95 2.305-32 5.879V224c0-35.3 28.7-64 64-64 17.67 0 32-14.33 32-32s-14.33-32-32-32c-70.58 0-128 57.42-128 128v96c0 53.02 42.98 96 96 96s96-42.98 96-96-43-96-96-96z"
			/>
		</svg>
	);
};

export default QuoteIcon;
