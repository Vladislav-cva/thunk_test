import axios from 'axios';
import { userLoginAction } from './userActionCreators';

export const getCurrentUser = (action) => async (dispatch, getState) => {
	const token = localStorage.getItem('token');
	try {
		const response = await axios({
			method: 'get',
			headers: { Authorization: token },
			url: 'http://localhost:3000/users/me',
		});
		if (response.status === 200) {
			dispatch(
				userLoginAction({
					...response.data.result,
					isAuth: true,
					password: '',
				})
			);
		}
	} catch (error) {
		console.log(error);
	}
};

export const handleLoginUser =
	(user, history, redirectToCourses) => async (dispatch, getState) => {
		try {
			const response = await axios({
				method: 'post',
				url: 'http://localhost:3000/login',
				data: user,
			});
			if (response.status === 201) {
				localStorage.setItem('token', response.data.result);
				history.push(redirectToCourses);
			}
		} catch (error) {
			alert('wrong password or email');
		}
	};

export const handleSubmitRegistrationUser =
	(history, redirectURL, user) => async (dispatch, getState) => {
		try {
			const result = await axios({
				method: 'post',
				url: 'http://localhost:3000/register',
				data: user,
			});

			if (result.status === 201) {
				history.push(redirectURL);
			}
		} catch (error) {
			alert('wrong password or email');
		}
	};

export const logout = () => async (dispatch, getState) => {
	const token = localStorage.getItem('token');
	try {
		const response = await axios({
			method: 'delete',
			url: 'http://localhost:3000/logout',
			headers: {
				Authorization: token,
			},
		});
		if (response.status === 200) {
			localStorage.clear();
			dispatch(
				userLoginAction({
					isAuth: false,
					name: '',
					email: '',
					token: '',
					role: '',
				})
			);
		}
	} catch (error) {
		console.log(error);
	}
};
