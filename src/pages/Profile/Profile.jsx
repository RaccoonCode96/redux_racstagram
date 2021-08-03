import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserInfoThunk } from '../../redux/modules/users';
import { getCurrentUserPostsThunk } from '../../redux/modules/post';
import Navigation from '../../components/common/Navigation';
const Profile = () => {
	const dispatch = useDispatch();

	const getInfoPosts = useCallback(async () => {
		dispatch(getCurrentUserInfoThunk());
		dispatch(getCurrentUserPostsThunk());
	}, [dispatch]);

	return (
		<>
			<Navigation />
			<UserProfileContainer
				getInfoPosts={getInfoPosts}
				postsType={'currentUserPosts'}
				infoType={'currentUserInfo'}
			/>
			<div className="modal_root"></div>
		</>
	);
};

export default Profile;
