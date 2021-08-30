import { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from './AuthForm';
import { emailSignInThunk, emailSignUpThunk } from '../../redux/modules/auth';
import { checkDisplayNameThunk } from '../../redux/modules/users';
import { useEffect } from 'react';
import { debounce } from 'lodash';

const AuthFormContainer = ({ newAccount }) => {
	const dispatch = useDispatch();

	// redux state (회원가입, 로그인 loading 상태 표시를 위함)
	const { emailSignUp, emailSignIn, socialSignIn } = useSelector(
		(state) => state.auth
	);

	// state
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		displayName: '',
	});

	// 로그인 창 또는 회원 가입 창으로 변경시 (Account 변경) input 초기화
	useEffect(() => {
		return () => {
			setInputs({
				email: '',
				password: '',
				displayName: '',
			});
		};
	}, [newAccount]);

	// 유저 이름 중복 체크 요청 함수
	const check = useCallback(
		(displayName) => {
			dispatch(checkDisplayNameThunk(displayName));
		},
		[dispatch]
	);

	const debounceCheck = useMemo(
		() =>
			debounce((displayName) => {
				check(displayName);
			}, 500),
		[check]
	);

	// onChange event Handler (email, password, displayName)
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
				debounceCheck(value);
			}
		},
		[inputs, debounceCheck]
	);

	// onSubmit event Handler
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
			emailSignIn={emailSignIn.loading}
			emailSignUp={emailSignUp.loading}
			socialSignIn={socialSignIn.loading}
		/>
	);
};

export default AuthFormContainer;
