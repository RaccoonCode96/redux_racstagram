import ShowError from '../../components/common/ShowError';
import SocialSignInContainer from '../../components/SocialSignIn/SocialSignInContainer';
import AuthFormContainer from '../../components/AuthForm/AuthFormCotainer';
import { useDispatch } from 'react-redux';
import { resetAuth, selectError } from '../../redux/modules/auth';
import { useEffect } from 'react';
import './Auth.scss';
import { useState } from 'react';

const Auth = () => {
	const dispatch = useDispatch();
	const [newAccount, setNewAccount] = useState(false);

	const toggleAccount = () => {
		setNewAccount(!newAccount);
		dispatch(selectError(''));
	};

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
