import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { updateSelector } from '../redux/modules/common';
import { getCurrentUserInfoThunk } from '../redux/modules/users';

const UserProfileContainer = () => {
	const dispatch = useDispatch();
	const profileInfo = useSelector((state) => state.users.currentUserInfo);
	const history = useHistory();
	useEffect(() => {
		dispatch(getCurrentUserInfoThunk());
	}, [dispatch]);
	const updateProfile = useCallback(() => {
		dispatch(updateSelector('profile'));
		history.push('/update');
	}, [dispatch, history]);
	return (
		<UserProfile updateProfile={updateProfile} profileInfo={profileInfo} />
	);
};

export default UserProfileContainer;
