import React from 'react';

const CircularExclamationIcon = ( { width = 16, height = 16, fill = '#333333', var: varProp, ...props } ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width={ width }
			height={ height }
			{ ...props }
		>
			<path fill={ varProp ? `var( ${ varProp })` : fill } d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-24 152c0-13.2 10.8-24 24-24s24 10.75 24 24v128c0 13.25-10.75 24-24 24s-24-10.7-24-24V152zm24 248c-17.36 0-31.44-14.08-31.44-31.44s14.07-31.44 31.44-31.44 31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z" />
		</svg>
	);
};

export default CircularExclamationIcon;
