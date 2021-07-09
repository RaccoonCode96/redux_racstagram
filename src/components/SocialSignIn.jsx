import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialSignIn = ({ onSocialClick }) => {
	return (
		<div className="auth_socialLogin">
			<button className="socialLogin_btn" name="google" onClick={onSocialClick}>
				<FontAwesomeIcon className="icon_google" icon={faGoogle} size="1x" />
				Continue with Google
			</button>
			<button className="socialLogin_btn" name="github" onClick={onSocialClick}>
				<FontAwesomeIcon className="icon_github" icon={faGithub} size="1x" />
				Continue with Github
			</button>
		</div>
	);
};

export default SocialSignIn;
