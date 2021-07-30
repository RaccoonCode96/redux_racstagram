import ShowError from '../../components/common/showError';
import SocialSignInContainer from '../../components/SocialSignIn/SocialSignInContainer';
import AuthFormContainer from '../../components/AuthForm/AuthFormCotainer';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth, setNewAccount } from '../../redux/modules/auth';
import { useEffect } from 'react';
import './Auth.scss';

const Auth = () => {
	const dispatch = useDispatch();
	const newAccount = useSelector((state) => state.auth.newAccount);

	const toggleAccount = () => {
		dispatch(setNewAccount(!newAccount));
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
				<AuthFormContainer />
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
