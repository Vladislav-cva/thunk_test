import {
	getAuthorsListAction,
	addNewAuthorsAction,
} from './authorsActionCreators';
import { get_authors_list, add_new_authors } from './authorsActionTypes';

const initialValue = {
	authors: [],
};

export function authorsReducer(
	state = initialValue,
	action = { getAuthorsListAction, addNewAuthorsAction }
) {
	if (action.type === get_authors_list)
		return {
			...state,
			authors: action.data,
		};
	if (action.type === add_new_authors) {
		return {
			...state,
			authors: action.data,
		};
	}
	return state;
}
