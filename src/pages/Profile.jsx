import UserProfileContainer from '../containers/UserProfileContainer';
import SignOutContainer from '../containers/SignOutContainer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUserInfoThunk } from '../redux/modules/users';
import { getCurrentUserPostsThunk } from '../redux/modules/post';
import Navigation from '../components/Navigation';
const Profile = () => {
	const dispatch = useDispatch();

	const getInfo = useCallback(() => {
		dispatch(getCurrentUserInfoThunk());
	}, [dispatch]);

	const getPosts = useCallback(() => {
		dispatch(getCurrentUserPostsThunk());
	}, [dispatch]);

	return (
		<>
			<Navigation />
			<UserProfileContainer
				profileInfoType={'currentUserInfo'}
				postsType={'currentUserPosts'}
				getPosts={getPosts}
				getInfo={getInfo}
			/>
			<SignOutContainer />
		</>
	);
};

export default Profile;
