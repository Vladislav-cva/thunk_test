import PrivateRoute from '../PrivateRouter/PrivateRoute';

import { COURSES_URL } from './urlsConstants';

import Courses from './Courses.jsx';

export const CoursesRoutes = [
	<PrivateRoute
		exact
		key='courses-route'
		path={COURSES_URL.urlTemplate}
		component={Courses}
	/>,
];
