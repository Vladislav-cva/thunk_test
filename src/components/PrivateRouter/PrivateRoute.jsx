import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../helpers/constantsForSelector';

const PrivateRoute = (props) => {
	const userRole = useSelector(getUser);
	const { component: Component, ...rest } = props;

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				userRole.role === 'admin' || localStorage.token ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: routeProps.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
