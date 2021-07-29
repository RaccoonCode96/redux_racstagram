import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialSignIn = ({ onSocialClick }) => {
	return (
		<>
			<div className="auth_ortext">
				<div className="ortext_slice"></div>
				<div className="ortext">Or</div>
				<div className="ortext_slice"></div>
			</div>
			<div className="auth_socialLogin">
				<button
					className="socialLogin_btn"
					name="google"
					onClick={onSocialClick}
				>
					<FontAwesomeIcon className="icon_google" icon={faGoogle} size="1x" />
					Google로 로그인 하기
				</button>
				<button
					className="socialLogin_btn"
					name="github"
					onClick={onSocialClick}
				>
					<FontAwesomeIcon className="icon_github" icon={faGithub} size="1x" />
					Github로 로그인 하기
				</button>
			</div>
		</>
	);
};

export default SocialSignIn;
