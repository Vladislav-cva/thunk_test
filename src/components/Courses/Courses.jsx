import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { handleGetCoursesList } from '../../store/courses/coursesThunk';
import { getCoursesListAction } from '../../store/courses/coursesActionCreators';
import { handleGetAuthorsList } from '../../store/authors/authorsThunk';
import { getAuthorsListAction } from '../../store/authors/authorsActionCreators';

import {
	getCourses,
	getAuthors,
	getUser,
} from '../../helpers/constantsForSelector';

import { useHistory } from 'react-router-dom';
import { CREATE_COURSE_URL } from '../FormCourse/urlsConstants';

import Button from '../../common/Button/Button.jsx';
import CourseCard from './components/CourseCard/CourseCard.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';

import { getParseData } from '../../helpers/getParseData';

import { getCurrentUser } from '../../store/users/usersThunk';

import './Courses.css';

function Courses() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [data, setData] = React.useState([]);

	const getCourseFromStore = useSelector(getCourses);
	const getAuthorsFromStore = useSelector(getAuthors);
	const user = useSelector(getUser);

	const token = localStorage.getItem('token');

	const handleRedirectAddNewCourse = () => {
		history.push(CREATE_COURSE_URL.urlTemplate);
	};

	React.useEffect(() => {
		setData(getParseData(getCourseFromStore, getAuthorsFromStore));
	}, [getAuthorsFromStore, getCourseFromStore, handleGetCoursesList]);

	React.useEffect(() => {
		dispatch(handleGetCoursesList(getCoursesListAction));
		dispatch(handleGetAuthorsList(getAuthorsListAction));
	}, []);

	React.useEffect(() => {
		dispatch(getCurrentUser(token));
	}, [token]);

	return (
		<div className='courses-wrapper'>
			<div className='search-block' data-testid='courseCardContainer'>
				<SearchBar data={data} setData={setData} />
				<Button
					title='add new course'
					disabled={user.role !== 'admin' ? 'disabled' : ''}
					onClick={handleRedirectAddNewCourse}
				/>
			</div>
			{data.map((item) => {
				const allCurrentAuthors = item.authors.map((elem) => {
					return getAuthorsFromStore.find((re) => re.id === elem);
				});
				return (
					<React.Fragment key={item.id}>
						<CourseCard
							id={item.id}
							title={item.title}
							description={item.description}
							authors={item.names}
							allCurAuthors={allCurrentAuthors}
							duration={item.duration}
							created={item.creationDate}
						/>
					</React.Fragment>
				);
			})}
		</div>
	);
}

export default Courses;
