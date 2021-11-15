import { get_authors_list, add_new_authors } from './authorsActionTypes';

export const getAuthorsListAction = (data) => ({
	type: get_authors_list,
	data: data,
});

export const addNewAuthorsAction = (data) => ({
	type: add_new_authors,
	data: data,
});
