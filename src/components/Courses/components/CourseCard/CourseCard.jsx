import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../../../../store/courses/coursesThunk.js';

import Button from '../../../../common/Button/Button.jsx';

import deleteIcon from '../../../../assets/delete.png';
import editIcon from '../../../../assets/edit.svg.png';

import { getUser } from '../../../../helpers/constantsForSelector.js';
import { formatMitutesInHours } from '../../../../helpers/formatMitutesInHours';

import './CourseCard.css';

function CourseCard({
	id,
	title,
	description,
	authors,
	duration,
	created,
	allCurAuthors,
}) {
	const history = useHistory();
	const user = useSelector(getUser);
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');

	const onDelete = () => {
		dispatch(deleteCourse(id, token));
	};

	return (
		<div className='card-wrapper' data-testid='cardWrapper' key={id}>
			<div className='card-title'>
				<h1>{title}</h1>
				<span className='card-description'>{description}</span>
			</div>
			<div className='course-info'>
				<span>
					<b>Authors: </b>
					{authors.join(', ')}
				</span>
				<span>
					<b>Duration: </b>
					{formatMitutesInHours(duration)}
				</span>
				<span>
					<b>Created: </b>
					{created}
				</span>
				<div className='buttons-wrapper'>
					<Button
						title='Show course'
						onClick={() =>
							history.push(`${'/courses'}/${id}`, {
								title,
								description,
								authors,
								duration,
								created,
							})
						}
					/>
					{user.role === 'admin' && (
						<>
							<Button
								icon
								src={editIcon}
								onClick={() =>
									history.push(`${'/course/update/'}${id}`, {
										id,
										title,
										description,
										allCurAuthors,
										duration,
									})
								}
							/>
							<Button icon src={deleteIcon} onClick={onDelete} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.arrayOf(PropTypes.string),
	duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	created: PropTypes.string,
};

export default CourseCard;
