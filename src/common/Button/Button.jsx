import React from 'react';

import './Button.css';

function Button({ type, onClick, title, icon, src, disabled, dataTestid }) {
	return (
		<button
			data-testid={dataTestid}
			className={icon ? 'icon-wrapp' : 'button-wrapper'}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{icon ? <img src={src} alt='icon' style={{ width: '15px' }} /> : title}
		</button>
	);
}

export default Button;
