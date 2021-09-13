import { useEffect } from 'react';
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

	// 유저 정보 및 유저 게시글 Redux State
	const userPosts = useSelector((state) => state.post.userPosts);
	const userInfo = useSelector((state) => state.users.userInfo);

	// url에 해당하는 유저 정보 및 게시글 가져오기 요청
	const getInfoPosts = useCallback(() => {
		dispatch(getUserInfoThunk(userName));
		dispatch(getUserPostsThunk(userName));
	}, [dispatch, userName]);

	// 해당 유저 프로필 수정 페이지로 이동
	const updateProfile = useCallback(() => {
		history.push({
			pathname: '/update/profile',
			state: { profileInfo: userInfo, post: [] },
		});
	}, [history, userInfo]);

	// mount 이후 유저 정보 가져오도록 요청
	useEffect(() => {
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
