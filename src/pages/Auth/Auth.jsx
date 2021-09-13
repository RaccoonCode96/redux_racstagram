import ShowError from '../../components/common/ShowError';
import SocialSignInContainer from '../../components/SocialSignIn/SocialSignInContainer';
import AuthFormContainer from '../../components/AuthForm/AuthFormCotainer';
import { useDispatch } from 'react-redux';
import { resetAuth, selectError } from '../../redux/modules/auth';
import { useEffect } from 'react';
import './Auth.scss';
import { useState } from 'react';

// 로그인 또는 가입 page
const Auth = () => {
	const dispatch = useDispatch();
	// 로그인 페이지인지 가입 페이지인기 구분하는 state (false: isn't newAccount -> 로그인)
	const [newAccount, setNewAccount] = useState(false);

	// 로그인, 가입페이지 구분 state 변경 함수
	const toggleAccount = () => {
		setNewAccount(!newAccount);
		dispatch(selectError(''));
	};

	// Auth 페이지 unmount시 Auth와 관련된 redux state reset
	useEffect(() => {
		return () => {
			dispatch(resetAuth());
		};
	}, [dispatch]);

	return (
		<div className="auth">
			<div className="container">
				<h2 className="title">Racstagram</h2>
				<AuthFormContainer newAccount={newAccount} />
				<ShowError className="error" />
				{newAccount ? <></> : <SocialSignInContainer />}
			</div>
			<div className="container">
				{newAccount ? (
					<div>
						계정이 있으신가요?
						<span className="mode" onClick={toggleAccount}>
							로그인
						</span>
					</div>
				) : (
					<div>
						계정이 없으신가요?
						<span className="mode" onClick={toggleAccount}>
							회원가입
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Auth;
