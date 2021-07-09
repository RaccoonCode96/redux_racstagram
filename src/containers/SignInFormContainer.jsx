import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SignInForm from '../components/SignInForm';
import { emailSignInThunk } from '../redux/modules/auth';

const SignInFormContainer = () => {
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
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
			}
		},
		[inputs]
	);

	const onSubmit = useCallback(
		(event) => {
			event.preventDefault();
			dispatch(emailSignInThunk(inputs));
		},
		[inputs, dispatch]
	);

	return <SignInForm onChange={onChange} inputs={inputs} onSubmit={onSubmit} />;
};

export default SignInFormContainer;
