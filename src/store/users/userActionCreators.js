import { user_login } from './userActionTypes';

export const userLoginAction = (user) => ({
	type: user_login,
	user: user,
});
