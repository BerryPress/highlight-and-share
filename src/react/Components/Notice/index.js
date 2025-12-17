// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { speak } from '@wordpress/a11y';
import { Notice as WPNotice } from '@wordpress/components';
import classNames from 'classnames';

const Notice = ( {
	message = '',
	status = 'info',
	politeness = 'polite',
	icon = null,
	className = '',
	inline = false,
	children,
	animate = false,
	animationType = 'fadein',
	...props
} ) => {

	useEffect( () => {
		speak( message, politeness );
	}, [ message, status, politeness ] );

	const hasIcon = () => {
		return icon !== null;
	};
	const getIcon = ( Icon ) => {
		return <Icon width={ 16 } height={ 16 } fill="#6c757d" />;
	};

	const containerClasses = classNames( className, 'has-admin__notice', {
		'has-admin__notice--has-icon': hasIcon(),
		[ `has-admin__notice-type--${ status }` ]: true,
		[ `has-admin__notice-appearance--inline` ]: inline,
		[ `has-admin__notice-appearance--block` ]: ! inline,
		[ `has-admin__notice-animate` ]: animate,
		[ `has-admin__notice-animate--${ animationType }` ]: animate,

	} );
	return (
		<div className={ containerClasses }>
			<WPNotice isDismissible={ false } spokenMessage={ message } actions={ [] } { ...props }>
				{ hasIcon() &&
					<div className="has-admin__notice-icon">{ getIcon( icon ) }</div>
				}
				<div className="has-admin__notice-message"><>{ message } { children } </></div>
			</WPNotice>
		</div>
	);
};

export default Notice;
