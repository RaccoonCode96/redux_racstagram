import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SignOut from '../components/SignOut';
import { signOutThunk } from '../redux/modules/auth';

const SignOutContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const onSignOutClick = useCallback(async () => {
		dispatch(signOutThunk());
		history.push('/');
	}, [history, dispatch]);
	return <SignOut onSignOutClick={onSignOutClick} />;
};

export default SignOutContainer;
