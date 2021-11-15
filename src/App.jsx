import React from 'react';

import Header from '../src/components/Header/Header.jsx';

import { Provider } from 'react-redux';

import { store } from './store';

import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { AppRoutes } from './app-routes';
import { history } from './history-instance';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<BrowserRouter history={history}>
					<Header />
					<Switch>{AppRoutes}</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
