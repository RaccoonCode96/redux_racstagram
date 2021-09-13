import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SignOut from './SignOut';
import { signOutThunk } from '../../redux/modules/auth';

const SignOutContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	// 로그아웃 실행 함수
	const onSignOutClick = useCallback(async () => {
		await dispatch(signOutThunk());
		history.push('/');
	}, [history, dispatch]);
	return <SignOut onSignOutClick={onSignOutClick} />;
};

export default SignOutContainer;
