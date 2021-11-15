import React from 'react';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { LOGIN_URL } from '../Login/urlsConstants.js';

import FormInput from '../../common/FormInput/FormInput.jsx';
import Button from '../../common/Button/Button.jsx';

import { Formik } from 'formik';
import { Form } from 'formik-antd';
import * as Yup from 'yup';

import { handleSubmitRegistrationUser } from '../../store/users/usersThunk';

import '../Login/Sign.css';

const RegistrationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('name is Required'),
	email: Yup.string().required('Email is Required').email('Invalid email'),
	password: Yup.string()
		.min(6, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
});

export function Registration() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [user, setUser] = React.useState({ name: '', email: '', password: '' });

	const handleChangeUserValue = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setUser({ ...user, [name]: value });
	};

	const handleSubmitRegistration = () => {
		dispatch(
			handleSubmitRegistrationUser(history, LOGIN_URL.urlTemplate, user)
		);
	};

	return (
		<div className='auth-wrapper'>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
				}}
				validationSchema={RegistrationSchema}
				onSubmit={handleSubmitRegistration}
			>
				{({ errors, touched }) => (
					<Form>
						<h1>Registration</h1>
						<Form.Item name='name' style={{ width: '100%' }}>
							<FormInput
								name='name'
								value={user.name}
								label='name'
								placeholder='Enter password'
								onChange={handleChangeUserValue}
							/>
						</Form.Item>

						<Form.Item name='email' style={{ width: '100%' }}>
							<FormInput
								name='email'
								value={user.email}
								label='Email'
								placeholder='Enter email'
								onChange={handleChangeUserValue}
							/>
						</Form.Item>
						<Form.Item name='password' style={{ width: '100%' }}>
							<FormInput
								name='password'
								value={user.password}
								label='Password'
								placeholder='Enter password'
								onChange={handleChangeUserValue}
							/>
						</Form.Item>
						<Button type='submit' title='Registration' />
						<span>
							if you not have an account you can &nbsp;
							<Link to='/login'>Login</Link>
						</span>
					</Form>
				)}
			</Formik>
		</div>
	);
}
