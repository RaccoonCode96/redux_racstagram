import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import SocialSignIn from '../components/SocialSignIn';
import { SocialSignInThunk } from '../redux/modules/init';

const SocialSignInContainer = () => {
	const dispatch = useDispatch();
	const onSocialClick = useCallback(
		(event) => {
			const {
				target: { name },
			} = event;
			dispatch(SocialSignInThunk(name));
		},
		[dispatch]
	);

	return <SocialSignIn onSocialClick={onSocialClick} />;
};

export default SocialSignInContainer;
