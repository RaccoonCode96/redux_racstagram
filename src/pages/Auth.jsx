import AuthForm from '../components/AuthForm';
import SignInError from '../components/SignInError';
import SocialSignInContainer from '../containers/SocialSignInContainer';

const Auth = () => {
	return (
		<>
			<div className="auth_container">
				<h2 className="auth_title">Racstagram</h2>
				<div className="auth_form">
					<AuthForm />
				</div>
				<div className="auth_ortext">
					<div className="ortext_slice"></div>
					<div className="ortext">Or</div>
					<div className="ortext_slice"></div>
				</div>
				<SocialSignInContainer />
				<SignInError />
			</div>
			<div className="auth_mode_container">
				<span className="auth_mode">
					{/* {newAccount ? 'Sign In' : 'Create Account'} */}
				</span>
			</div>
		</>
	);
};

export default Auth;
