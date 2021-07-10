import ShowError from '../components/showError';
import SocialSignInContainer from '../containers/SocialSignInContainer';
import AuthFormContainer from '../containers/AuthFormCotainer';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth, setNewAccount } from '../redux/modules/auth';
import { useEffect } from 'react';

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
		<>
			<div className="auth_container">
				<h2 className="auth_title">Racstagram</h2>
				<div className="auth_form">
					<AuthFormContainer />
				</div>
				{newAccount ? <></> : <SocialSignInContainer />}
				<ShowError />
			</div>
			<div className="auth_mode_container">
				<span className="auth_mode" onClick={toggleAccount}>
					{newAccount
						? '계정이 있으신가요? 로그인'
						: '계정이 없으신가요? 가입하기'}
				</span>
			</div>
		</>
	);
};

export default Auth;
