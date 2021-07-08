import { useCallback } from 'react';
import { useHistory } from 'react-router';
import SignOut from '../components/SignOut';
import { authService } from '../fBase';

const SignOutContainer = () => {
	const history = useHistory();
	const onSignOutClick = useCallback(() => {
		authService.signOut();
		history.push('/');
	}, [history]);
	return <SignOut onSignOutClick={onSignOutClick} />;
};

export default SignOutContainer;
