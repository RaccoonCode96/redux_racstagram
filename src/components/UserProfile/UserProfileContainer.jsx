import { useLayoutEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
	getCurrentUserPostsThunk,
	getUserPostsThunk,
} from '../../redux/modules/post';
import { getUserInfoThunk } from '../../redux/modules/users';
import ProfilePostImages from '../common/ProfilePostImages';
import UserProfile from './UserProfile';
import './UserProfileContainer.scss';

const UserProfileContainer = () => {
	const { pathname } = useLocation();
	const { userName } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const currentUserPosts = useSelector((state) => state.post.currentUserPosts);
	const currentUserInfo = useSelector((state) => state.users.currentUserInfo);
	const userPosts = useSelector((state) => state.post.userPosts);
	const userInfo = useSelector((state) => state.users.userInfo);

	const getInfoPosts = useCallback(() => {
		if (pathname === '/profile' && !currentUserPosts.length) {
			dispatch(getCurrentUserPostsThunk());
		} else if (pathname === `/user/${userName}`) {
			dispatch(getUserInfoThunk(userName));
			dispatch(getUserPostsThunk(userName));
		}
	}, [dispatch, pathname, userName, currentUserPosts]);

	const updateProfile = useCallback(() => {
		history.push({
			pathname: '/update',
			state: { profileInfo: currentUserInfo, post: [], type: 'profile' },
		});
	}, [history, currentUserInfo]);

	useLayoutEffect(() => {
		getInfoPosts();
	}, [getInfoPosts]);

	return (
		<div className="user_profile_container">
			<>
				<UserProfile
					profileInfo={pathname === '/profile' ? currentUserInfo : userInfo}
					updateProfile={updateProfile}
					postCount={
						pathname === '/profile'
							? currentUserPosts?.length
							: userPosts?.length
					}
				/>
				<ProfilePostImages
					posts={pathname === '/profile' ? currentUserPosts : userPosts}
				/>
			</>
		</div>
	);
};

export default UserProfileContainer;
