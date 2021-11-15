import React from 'react';

import { useHistory, useLocation, useParams } from 'react-router';
import { COURSES_URL } from '../Courses/urlsConstants';

import './CourseInfo.css';

export function CourseInfo() {
	const history = useHistory();
	const location = useLocation();

	let { id } = useParams();
	const currentLocation = location.state;

	return (
		<div className='course-info-wrapper'>
			<button
				className='close-btn'
				onClick={() => history.push(COURSES_URL.urlTemplate)}
			>
				{'<'} back to courses
			</button>
			<h1>{currentLocation.title}</h1>
			<div className='course-info-content'>
				<div className='description-wrapper'>
					<span>{currentLocation.description}</span>
				</div>
				<div className='description-wrapper-info'>
					<span>
						<b>id:</b> {id}
					</span>
					<span>
						<b>duration: </b> {currentLocation.duration} hourse
					</span>
					<span>
						<b>created: </b>
						{currentLocation.created}
					</span>
					<span>
						<b>authors:</b>
					</span>
					<span>{currentLocation.authors.join(', ')}</span>
				</div>
			</div>
		</div>
	);
}
