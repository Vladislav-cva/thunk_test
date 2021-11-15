import { coursesReducer, initialValue } from '../coursesReducer';
import { get_courses_list, add_new_course } from '../coursesActionTypes';

describe('courses test', () => {
	test('return state course', () => {
		const action = {
			type: 'RETURN_STATE',
		};

		expect(coursesReducer(initialValue, action)).toEqual({
			...initialValue,
		});
	});

	test('get courses list', () => {
		const action = {
			type: get_courses_list,
			payload: ['test'],
		};

		expect(coursesReducer(initialValue, action)).toEqual({
			...initialValue,
			courses: action.payload,
		});
	});

	test('add new course', () => {
		const action = {
			type: add_new_course,
			payload: ['test'],
		};

		expect(coursesReducer(initialValue, action)).toEqual({
			...initialValue,
			courses: action.payload,
		});
	});
});
