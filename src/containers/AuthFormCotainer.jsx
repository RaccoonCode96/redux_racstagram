import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { emailSignInThunk, emailSignUpThunk } from '../redux/modules/auth';

const AuthFormContainer = () => {
	const dispatch = useDispatch();
	const newAccount = useSelector((state) => state.auth.newAccount);
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		displayName: '',
	});

	const onChange = useCallback(
		(event) => {
			const { name, value } = event.target;
			if (name === 'email') {
				setInputs({
					...inputs,
					email: value,
				});
			} else if (name === 'password') {
				setInputs({
					...inputs,
					password: value,
				});
			} else if (name === 'displayName') {
				setInputs({
					...inputs,
					displayName: value,
				});
			}
		},
		[inputs]
	);

	const onSubmit = useCallback(
		(event) => {
			event.preventDefault();
			if (newAccount === false) {
				dispatch(emailSignInThunk(inputs));
			} else {
				dispatch(emailSignUpThunk(inputs));
			}
		},
		[inputs, dispatch, newAccount]
	);

	return (
		<AuthForm
			onChange={onChange}
			inputs={inputs}
			onSubmit={onSubmit}
			newAccount={newAccount}
		/>
	);
};

export default AuthFormContainer;
