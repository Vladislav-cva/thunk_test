import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAuthors } from '../../helpers/constantsForSelector';

import { useHistory, useLocation, useParams } from 'react-router';
import { COURSES_URL } from '../Courses/urlsConstants';

import Input from '../../common/Input/Input.jsx';
import Button from '../../common/Button/Button.jsx';
import { AllAuthors } from './components/AllAuthors.jsx';

import { formatMitutesInHours } from '../../helpers/formatMitutesInHours';

import './FormCourse.css';
import {
	createNewAuthor,
	handleGetAuthorsList,
} from '../../store/authors/authorsThunk';
import { createNewCourse, editCourse } from '../../store/courses/coursesThunk';
import { getAuthorsListAction } from '../../store/authors/authorsActionCreators';

export function CreateCourse() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	let { id } = useParams();

	const token = localStorage.getItem('token');

	const authorsList = useSelector(getAuthors);

	const cur = location.state;

	const [courseList, setCourseList] = React.useState({
		title: '',
		description: '',
		duration: '',
		authors: [],
	});

	const [authorName, setAuthorName] = React.useState({ name: '' });
	const [authorsData, setAuthorsData] = React.useState([]);
	const [likedAuthors, setLikedAuthors] = React.useState([]);

	const getChooseAuthors = (id) => {
		setAuthorsData(authorsData.filter((item) => item.id !== id));
	};

	const handleChooseAuthors = (id, name) => {
		setLikedAuthors([...likedAuthors, { id, name }]);
		getChooseAuthors(id);
	};

	const getRemoveChooseAuthors = (id) => {
		setLikedAuthors(likedAuthors.filter((item) => item.id !== id));
	};

	const handleRemoveChooseAuthors = (id, name) => {
		setAuthorsData([...authorsData, { id, name }]);
		getRemoveChooseAuthors(id);
	};

	const handleSetAuthor = (e) => {
		const value = e.target.value;
		setAuthorName({ name: value });
	};

	const handleChangeDuration = (e) => {
		setCourseList({
			...courseList,
			duration: +e.target.value,
		});
	};

	const handleCreateTitle = (e) => {
		setCourseList({
			...courseList,
			title: e.target.value,
		});
	};

	const handleDescription = (e) => {
		setCourseList({ ...courseList, description: e.target.value });
	};

	const handleCreateCourse = () => {
		let authorsId = likedAuthors.map((item) => item.id);

		if (id) {
			dispatch(
				editCourse({ ...courseList, authors: [...authorsId] }, token, id)
			);
		} else {
			dispatch(
				createNewCourse({ ...courseList, authors: [...authorsId] }, token)
			);
		}
		history.push(COURSES_URL.urlTemplate);
	};

	const handleCreateAuthor = () => {
		dispatch(createNewAuthor(authorName, token));
	};

	React.useEffect(() => {
		dispatch(handleGetAuthorsList(getAuthorsListAction));
	}, [dispatch]);

	React.useEffect(() => {
		if (cur && cur.id === id) {
			setCourseList({
				title: cur.title,
				description: cur.description,
				duration: cur.duration,
			});
			setLikedAuthors(cur.allCurAuthors);
		}
	}, [cur, id]);

	React.useEffect(() => {
		setAuthorsData(authorsList);
	}, [authorsList]);

	return (
		<div className='create-course-wrapper'>
			<div className='course-name-wrapper'>
				<div className='title-wrapper'>
					<Input
						name='title'
						value={courseList.title}
						label='Title'
						placeholder='Enter title...'
						onChange={handleCreateTitle}
					/>
					<Button
						title='Create course'
						type='submit'
						onClick={handleCreateCourse}
					/>
				</div>
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					value={courseList.description}
					id='description'
					placeholder='Enter description'
					onChange={handleDescription}
				></textarea>
			</div>
			<div className='author-wrapper'>
				<div className='add-authors'>
					<div className='add-authors-content'>
						<h3>Add authors</h3>
						<Input
							name='authors'
							label='Author name'
							placeholder='Enter author name...'
							onChange={handleSetAuthor}
						/>
						<Button
							dataTestid='addAuthorBtn'
							type='button'
							title='Create author'
							onClick={handleCreateAuthor}
						/>
					</div>
					<div className='add-authors-content'>
						<h3>Duration</h3>
						<Input
							value={courseList.duration}
							name='duration'
							label='Duration'
							placeholder='Enter duration in minutes...'
							onChange={handleChangeDuration}
						/>
						<span>
							<b>
								DURATION:
								{formatMitutesInHours(courseList.duration)}
							</b>
						</span>
					</div>
				</div>
				<AllAuthors
					authorsData={authorsData}
					handleChooseAuthors={handleChooseAuthors}
					id={id}
					likedAuthors={likedAuthors}
					handleRemoveChooseAuthors={handleRemoveChooseAuthors}
				/>
			</div>
		</div>
	);
}
