import PrivateRoute from '../PrivateRouter/PrivateRoute';

import { CREATE_COURSE_URL } from './urlsConstants';

import { CreateCourse } from './FormCourse.jsx';

export const CreateCourseRoute = [
	<PrivateRoute
		key='create-course-route'
		path={CREATE_COURSE_URL.urlTemplate}
		component={CreateCourse}
	/>,

	<PrivateRoute
		exact
		key='change-course'
		path='/course/update/:id'
		component={CreateCourse}
	/>,
];
