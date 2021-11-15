import React from 'react';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom';

import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import { CreateCourse } from '../FormCourse.jsx';
import { AllAuthors } from '../components/AllAuthors.jsx';

const mockCourseAuthors = {
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
};

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
			{
				id: 'f762978b-61eb4096-812b-ebde228381671',
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

const mockRemoveChooseAuthors = () => {
	return mockCourseAuthors.authors.pop();
};

const mockAddAuthors = () => {
	mockCourseAuthors.authors[2] = {
		id: 'f762978b-61eb4096-812b-ebde228381672',
		name: 'Nicolas Kim',
	};
};

const mockDispatch = jest.fn();
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: mockDispatch,
};

describe('FormCourse component test', () => {
	const history = createBrowserHistory();
	test('CourseForm should show authors lists (all and course authors)', () => {
		render(
			<AllAuthors
				authorsData={mockedState.authors.authors}
				likedAuthors={mockCourseAuthors.authors}
			/>
		);
		const list = screen.getAllByTestId('authors-block');
		const chooseList = screen.getAllByTestId('chooseAuthorsBlock');

		expect(list.length).toEqual(mockedState.authors.authors.length);
		expect(chooseList.length).toEqual(mockCourseAuthors.authors.length);
	});

	test('CourseForm Create author click button should call dispatch', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<BrowserRouter history={history}>
					<CreateCourse />
				</BrowserRouter>
			</Provider>
		);

		fireEvent.click(getByText(/Create author/i));
		expect(mockDispatch).toHaveBeenCalledTimes(2);
	});

	test('CourseForm Add author button click should add an author to course authors list', () => {
		render(
			<AllAuthors
				authorsData={mockedState.authors.authors}
				likedAuthors={mockCourseAuthors.authors}
				handleChooseAuthors={mockAddAuthors}
			/>
		);

		fireEvent.click(screen.getAllByTestId('addAuthorInList')[0]);
		expect(mockCourseAuthors.authors.length).toBe(3);
	});

	test('Delete author button click should delete an author from the course list', () => {
		render(
			<AllAuthors
				authorsData={mockedState.authors.authors}
				likedAuthors={mockCourseAuthors.authors}
				handleRemoveChooseAuthors={mockRemoveChooseAuthors}
			/>
		);

		fireEvent.click(screen.getAllByTestId('deleteAuthorInList')[0]);
		expect(mockCourseAuthors.authors.length).toBe(2);
	});
});
