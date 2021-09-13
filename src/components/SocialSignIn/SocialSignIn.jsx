import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SocialSignIn.scss';

// 소셜 로그인 컴포넌트
const SocialSignIn = ({ onSocialClick }) => {
	return (
		<>
			<div className="ortext_container">
				<div className="ortext_slice"></div>
				<div className="ortext">또는</div>
				<div className="ortext_slice"></div>
			</div>
			<div className="social_signIn">
				<button className="auth_btn" name="google" onClick={onSocialClick}>
					<FontAwesomeIcon className="icon" icon={faGoogle} size="1x" />
					Google로 로그인 하기
				</button>
				<button
					className="auth_btn"
					name="github"
					onClick={(e) => {
						onSocialClick(e);
					}}
				>
					<FontAwesomeIcon className="icon" icon={faGithub} size="1x" />
					Github로 로그인 하기
				</button>
			</div>
		</>
	);
};

export default SocialSignIn;
