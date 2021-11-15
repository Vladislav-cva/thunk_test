import axios from 'axios';
import { getCoursesListAction } from './coursesActionCreators';

export const handleGetCoursesList = (action) => async (dispatch, getState) => {
	try {
		const response = await axios({
			method: 'get',
			url: 'http://localhost:3000/courses/all',
		});
		if (response.status === 200) {
			dispatch(action(response.data.result));
		}
	} catch (error) {
		console.log(error);
	}
};

export const createNewCourse =
	(course, token) => async (dispatch, getState) => {
		try {
			const response = await axios({
				method: 'post',
				url: 'http://localhost:3000/courses/add',
				data: course,
				headers: { Authorization: token },
			});
			if (response.status === 201) {
				dispatch(handleGetCoursesList(getCoursesListAction));
			}
		} catch (error) {
			console.log(error);
		}
	};

export const deleteCourse = (id, token) => async (dispatch, getState) => {
	try {
		const response = await axios({
			method: 'delete',
			url: `http://localhost:3000/courses/${id}`,
			headers: {
				Authorization: token,
			},
		});
		if (response.status === 200) {
			dispatch(handleGetCoursesList(getCoursesListAction));
		}
	} catch (error) {
		console.log(error);
	}
};

export const editCourse = (course, token, id) => async (dispatch, getState) => {
	try {
		const response = await axios({
			method: 'put',
			url: `http://localhost:3000/courses/${id}`,
			data: course,
			headers: { Authorization: token },
		});
		if (response.status === 200) {
			dispatch(handleGetCoursesList(getCoursesListAction));
		}
	} catch (error) {
		console.log(error);
	}
};
