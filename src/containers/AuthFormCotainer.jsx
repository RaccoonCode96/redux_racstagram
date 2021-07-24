import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { emailSignInThunk, emailSignUpThunk } from '../redux/modules/auth';
import { checkDisplayNameThunk } from '../redux/modules/users';

const AuthFormContainer = () => {
	const dispatch = useDispatch();
	const exist = useSelector((state) => state.users.checkDisplayName.exist);
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
				if (!exist[1] || exist[1] !== inputs.displayName) {
					window.alert('닉네임 중복 확인이 필요 합니다.');
					return;
				}
				if (exist[0]) {
					window.alert(`${exist[1]}는 존재하는 닉네임 입니다.`);
					return;
				}
				dispatch(emailSignUpThunk(inputs));
			}
			return;
		},
		[inputs, dispatch, newAccount, exist]
	);

	const check = useCallback(
		(displayName) => {
			dispatch(checkDisplayNameThunk(displayName));
			return;
		},
		[dispatch]
	);

	return (
		<AuthForm
			onChange={onChange}
			inputs={inputs}
			onSubmit={onSubmit}
			newAccount={newAccount}
			check={check}
			exist={exist}
		/>
	);
};

export default AuthFormContainer;
