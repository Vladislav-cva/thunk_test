import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import dayjs from 'dayjs';

import CourseCard from '../CourseCard.jsx';
import { formatMitutesInHours } from '../../../../../helpers/formatMitutesInHours';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const authors = ['test'];

const course = {
	item: 'title',
	description: 'description',
	created: dayjs(new Date()).format('DD/MM/YYYY'),
	duration: formatMitutesInHours('300'),
};

describe('course card component tests', () => {
	let spyOnUseSelector;
	test('Course card renders', () => {
		spyOnUseSelector = jest.spyOn(redux, 'useSelector');
		spyOnUseSelector.mockReturnValue([{ user: { role: 'admin' } }]);
		render(
			<Provider store={mockedStore}>
				<CourseCard
					authors={authors}
					title={course.item}
					description={course.description}
					duration={course.duration}
				/>
			</Provider>
		);

		expect(screen.getByText('test')).toBeInTheDocument();
		expect(screen.getByText('title')).toBeInTheDocument();
		expect(screen.getByText('description')).toBeInTheDocument();
		expect(screen.getByText(authors)).toBeInTheDocument();
		expect(course.created).toEqual(dayjs().format('DD/MM/YYYY'));
		expect(course.duration).toEqual('5:00');
	});
});
