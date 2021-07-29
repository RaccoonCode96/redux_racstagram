import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Init from './Init';
import { authService } from '../../fBase';
import { setIsinitTrue } from '../../redux/modules/init';
import { setCurrentUser } from '../../redux/modules/profile';

const InitContainer = () => {
	const isInit = useSelector((state) => state.init.isInit);
	const dispatch = useDispatch();

	const isSignInOut = useCallback(() => {
		authService.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(setCurrentUser(user));
			} else {
				dispatch(setCurrentUser(''));
			}
			dispatch(setIsinitTrue());
		});
	}, [dispatch]);

	return <Init isInit={isInit} isSignInOut={isSignInOut} />;
};

export default InitContainer;
