import {
	getCoursesListAction,
	addNewCourseAction,
	deleteCurrentCourseAction,
} from './coursesActionCreators';
import {
	get_courses_list,
	delete_current_course,
	add_new_course,
} from './coursesActionTypes';

export const initialValue = {
	courses: [],
};

export function coursesReducer(
	state = initialValue,
	action = {
		getCoursesListAction,
		deleteCurrentCourseAction,
		addNewCourseAction,
	}
) {
	if (action.type === get_courses_list) {
		return {
			...state,
			courses: action.payload,
		};
	}
	if (action.type === delete_current_course) {
		return {
			...state,
			courses: action.payload,
		};
	}
	if (action.type === add_new_course) {
		return {
			...state,
			courses: action.payload,
		};
	}

	return state;
}
