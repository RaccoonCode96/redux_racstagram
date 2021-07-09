import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import SocialSignIn from '../components/SocialSignIn';
import { socialSignInThunk } from '../redux/modules/auth';

const SocialSignInContainer = () => {
	const dispatch = useDispatch();
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
