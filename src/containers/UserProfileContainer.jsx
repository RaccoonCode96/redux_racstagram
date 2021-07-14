import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { updateSelector } from '../redux/modules/init';

const UserProfileContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const updateProfile = useCallback(() => {
		dispatch(updateSelector('profile'));
		history.push('/update');
	}, [dispatch, history]);
	return <UserProfile updateProfile={updateProfile} />;
};

export default UserProfileContainer;
