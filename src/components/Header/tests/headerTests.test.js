import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Header from '../Header';

const mockedState = {
	user: {
		user: {
			isAuth: true,
			name: 'Test Name',
		},
	},
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Header component', () => {
	const history = createBrowserHistory();
	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter history={history}>
					<Header />
				</BrowserRouter>
			</Provider>
		);
	});

	test("header has user's name", () => {
		expect(screen.getByText('Test Name')).toBeInTheDocument();
	});

	test('header has logo', () => {
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
