import { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from './AuthForm';
import {
	emailSignInThunk,
	emailSignUpThunk,
	selectError,
} from '../../redux/modules/auth';
import { checkDisplayNameThunk } from '../../redux/modules/users';
import { useEffect } from 'react';
import { debounce } from 'lodash';

const AuthFormContainer = ({ newAccount }) => {
	const dispatch = useDispatch();
	const { exist, loading } = useSelector(
		(state) => state.users.checkDisplayName
	);
	const { emailSignUp, emailSignIn, socialSignIn } = useSelector(
		(state) => state.auth
	);

	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		displayName: '',
	});
	useEffect(() => {
		// 로그인 창 또는 회원 가입 창 변경시 (Account 변경) input 초기화
		return () => {
			setInputs({
				email: '',
				password: '',
				displayName: '',
			});
		};
	}, [newAccount]);

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
			}, 900),
		[check]
	);

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

	const onSubmit = useCallback(
		(event) => {
			event.preventDefault();
			const { email, password, displayName } = inputs;
			// input check
			if (!email) {
				dispatch(selectError('Email를 입력해 주세요.'));
				return;
			} else if (!password) {
				dispatch(selectError('Password를 입력해 주세요.'));
				return;
			} else if (newAccount && !displayName) {
				dispatch(selectError('User Name을 입력해 주세요.'));
				return;
			}

			if (newAccount === false) {
				dispatch(emailSignInThunk(inputs));
			} else {
				if (!exist[1] || exist[1] !== inputs.displayName) {
					dispatch(selectError('닉네임 중복 확인이 필요 합니다.'));
					return;
				}
				if (exist[0]) {
					dispatch(selectError(`${exist[1]}는 존재하는 닉네임 입니다.`));
					return;
				}
				dispatch(emailSignUpThunk(inputs));
			}
			return;
		},
		[inputs, dispatch, newAccount, exist]
	);

	return (
		<AuthForm
			onChange={onChange}
			inputs={inputs}
			onSubmit={onSubmit}
			newAccount={newAccount}
			check={check}
			exist={exist}
			emailSignIn={emailSignIn.loading}
			emailSignUp={emailSignUp.loading}
			socialSignIn={socialSignIn.loading}
			checkDisplayName={loading}
		/>
	);
};

export default AuthFormContainer;
