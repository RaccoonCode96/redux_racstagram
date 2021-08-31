import { useLayoutEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserPostsThunk } from '../../redux/modules/post';
import { getUserInfoThunk } from '../../redux/modules/users';
import ProfilePostImages from '../common/ProfilePostImages';
import UserProfile from './UserProfile';
import './UserProfileContainer.scss';

const UserProfileContainer = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const userPosts = useSelector((state) => state.post.userPosts);
	const userInfo = useSelector((state) => state.users.userInfo);

	const getInfoPosts = useCallback(() => {
		dispatch(getUserInfoThunk(userName));
		dispatch(getUserPostsThunk(userName));
	}, [dispatch, userName]);

	const updateProfile = useCallback(() => {
		history.push({
			pathname: '/update/profile',
			state: { profileInfo: userInfo, post: [] },
		});
	}, [history, userInfo]);

	// posts 가져오게 요청
	useLayoutEffect(() => {
		getInfoPosts();
	}, [getInfoPosts]);

	return (
		<div className="user_profile_container">
			<>
				<UserProfile
					profileInfo={userInfo}
					updateProfile={updateProfile}
					postCount={userPosts?.length}
				/>
				<ProfilePostImages posts={userPosts} />
			</>
		</div>
	);
};

export default UserProfileContainer;
