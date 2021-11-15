import React from 'react';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { COURSES_URL } from '../Courses/urlsConstants.js';

import { handleLoginUser } from '../../store/users/usersThunk.js';

import FormInput from '../../common/FormInput/FormInput.jsx';
import Button from '../../common/Button/Button.jsx';

import { Formik } from 'formik';
import { Form } from 'formik-antd';
import * as Yup from 'yup';

import './Sign.css';

const LoginSchema = Yup.object().shape({
	email: Yup.string().required('Email is Required').email('Invalid email'),
	password: Yup.string()
		.min(6, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
});

export function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [user, setUser] = React.useState({ email: '', password: '' });

	const handleChangeLogin = (e) => {
		const value = e.currentTarget.value;
		const name = e.target.name;
		setUser({ ...user, [name]: value });
	};

	const handleSubmitLoginUser = () => {
		dispatch(handleLoginUser(user, history, COURSES_URL.urlTemplate));
	};

	return (
		<div className='auth-wrapper'>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={LoginSchema}
				onSubmit={handleSubmitLoginUser}
			>
				{({ errors }) => (
					<Form>
						<h1>Login</h1>
						<Form.Item name='email' style={{ width: '100%' }}>
							<FormInput
								name='email'
								value={user.email}
								label='Email'
								placeholder='Enter email'
								onChange={handleChangeLogin}
							/>
						</Form.Item>
						<Form.Item name='password' style={{ width: '100%' }}>
							<FormInput
								name='password'
								value={user.password}
								label='Password'
								placeholder='Enter password'
								onChange={handleChangeLogin}
							/>
						</Form.Item>

						<Button type='submit' title='Login' />
						<span>
							if you not have an account you can &nbsp;
							<Link to='/registration'>Registration</Link>
						</span>
					</Form>
				)}
			</Formik>
		</div>
	);
}
