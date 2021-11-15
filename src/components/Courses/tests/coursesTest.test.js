import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Courses from '../Courses';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

const mockedState = {
	authors: {
		authors: [
			{
				id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
				name: 'Vasiliy Dobkin',
			},
			{
				id: 'f762978b-61eb4096-812b-ebde22838167',
				name: 'Nicolas Kim',
			},
		],
	},
	courses: {
		courses: [
			{
				id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
				title: 'JavaScript',
				description: 'some text',
				creationDate: '8/3/2021',
				duration: 160,
				authors: [
					'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
					'f762978b-61eb4096-812b-ebde22838167',
				],
			},
			{
				id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba1',
				title: 'JavaScript',
				description: 'some text',
				creationDate: '8/3/2021',
				duration: 160,
				authors: [
					'27cc3006-e93a-4748-8ca8-73d06aa93b6d1',
					'f762978b-61eb4096-812b-ebde228381671',
				],
			},
		],
	},
	user: {
		user: {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: 'admin',
		},
	},
};

const emptyMockedState = {
	authors: {
		authors: [],
	},
	courses: {
		courses: [],
	},
	user: {
		user: {},
	},
};

const emptyStore = {
	getState: () => emptyMockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('test courses component', () => {
	test('Courses should display amount of CoursesCard equal length of courses array', () => {
		render(
			<Provider store={mockedStore}>
				<Courses />
			</Provider>
		);

		const list = screen.getAllByTestId('cardWrapper');

		expect(list.length).toEqual(mockedState.courses.courses.length);
	});

	test('Courses should display Empty container if courses array length is 0', () => {
		render(
			<Provider store={emptyStore}>
				<Courses />
			</Provider>
		);

		const list = screen.getAllByTestId('courseCardContainer');
		expect(list).toBeDefined();
		expect(list.length).toBe(1);
	});

	test('CourseForm should be showed after a click on a button "Add new course"', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);
		fireEvent.click(getByText(/add new course/i));

		expect(mockHistoryPush).toHaveBeenCalledWith('/courses/add');
	});
});
