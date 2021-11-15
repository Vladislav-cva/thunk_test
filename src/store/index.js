import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { authorsReducer } from './authors/authorsReducer';
import { coursesReducer } from './courses/coursesReducer';
import { userReducer } from './users/usersReducer';

const reducerMap = {
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReducer,
};

const reducer = combineReducers(reducerMap);

const composeEnhancers =
	window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);
