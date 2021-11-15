import { get_courses_list } from './coursesActionTypes';
import { delete_current_course } from './coursesActionTypes';
import { add_new_course } from './coursesActionTypes';

export const getCoursesListAction = (payload) => {
	return {
		type: get_courses_list,
		payload: payload,
	};
};

export const deleteCurrentCourseAction = (payload) => {
	return {
		type: delete_current_course,
		payload: payload,
	};
};

export const addNewCourseAction = (payload) => {
	return {
		type: add_new_course,
		payload: payload,
	};
};
