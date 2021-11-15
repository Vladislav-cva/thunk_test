import axios from 'axios';

import { getAuthorsListAction } from './authorsActionCreators';

export const handleGetAuthorsList = (action) => async (dispatch, getState) => {
	try {
		const response = await axios({
			method: 'get',
			url: 'http://localhost:3000/authors/all',
		});
		if (response.status === 200) {
			dispatch(action(response.data.result));
		}
	} catch (er) {
		console.log(er);
	}
};

export const createNewAuthor =
	(author, token) => async (dispatch, getState) => {
		try {
			const response = await axios({
				method: 'post',
				url: 'http://localhost:3000/authors/add',
				data: author,
				headers: { Authorization: token },
			});
			if (response.status === 201) {
				dispatch(handleGetAuthorsList(getAuthorsListAction));
			}
		} catch (error) {
			console.log(error);
		}
	};
