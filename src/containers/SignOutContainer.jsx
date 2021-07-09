import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SignOut from '../components/SignOut';
import { authService } from '../fBase';
import { resetAuth } from '../redux/modules/auth';

const SignOutContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onSignOutClick = useCallback(async () => {
		await authService.signOut();
		history.push('/');
		dispatch(resetAuth());
	}, [history, dispatch]);
	return <SignOut onSignOutClick={onSignOutClick} />;
};

export default SignOutContainer;
