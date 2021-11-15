import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../helpers/constantsForSelector.js';

import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';

import { LOGIN_URL } from '../Login/urlsConstants.js';
import { REGISTRATION_URl } from '../Registration/urlsConstants.js';

import { logout } from '../../store/users/usersThunk';

import './Header.css';

function Header() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [routes, setRoutes] = React.useState();

	const user = useSelector(getUser);

	function handleLogout() {
		dispatch(logout());
	}

	React.useEffect(() => {
		const routes = [LOGIN_URL.urlTemplate, REGISTRATION_URl.urlTemplate].some(
			(item) => item === history.location.pathname
		);
		setRoutes(routes);
	}, [history.location]);

	return (
		<header>
			<Logo />
			{user && !routes ? (
				<div className='user-block'>
					<span>{user.name ? user.name : 'Admin'}</span>
					<Button title='Logout' onClick={handleLogout} />
				</div>
			) : null}
		</header>
	);
}

export default Header;
