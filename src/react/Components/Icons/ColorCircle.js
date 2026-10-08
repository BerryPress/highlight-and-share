import React from 'react';

const ColorCircle = ( props ) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" { ...props }>
		<path fill="currentColor" stroke="#333" strokeWidth="6px" strokeLinejoin="round" d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512z" />
	</svg>
);

export default ColorCircle;
