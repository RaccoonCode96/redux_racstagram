import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import SocialSignIn from './SocialSignIn';
import { socialSignInThunk } from '../../redux/modules/auth';

// 소셜 로그인 컴포넌트의 컨테이너
const SocialSignInContainer = () => {
	const dispatch = useDispatch();
	// 소셜 로그인 onClick Event handler
	const onSocialClick = useCallback(
		(event) => {
			const {
				target: { name },
			} = event;
			dispatch(socialSignInThunk(name));
		},
		[dispatch]
	);

	return <SocialSignIn onSocialClick={onSocialClick} />;
};

export default SocialSignInContainer;
