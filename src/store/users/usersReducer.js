import { userLoginAction } from './userActionCreators';
import { user_login } from './userActionTypes';

const initialValue = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		role: '',
	},
};

export function userReducer(
	state = initialValue,
	action = { userLoginAction }
) {
	if (action.type === user_login) {
		return {
			...state,
			user: action.user,
		};
	}
	return state;
}
