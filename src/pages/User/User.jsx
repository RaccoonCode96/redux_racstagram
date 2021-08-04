import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';
import { getUserPostsThunk } from '../../redux/modules/post';
import { getUserInfoThunk } from '../../redux/modules/users';

const User = () => {
	let { userName } = useParams();
	const dispatch = useDispatch();

	const getInfoPosts = useCallback(async () => {
		dispatch(getUserInfoThunk(userName));
		dispatch(getUserPostsThunk(userName));
	}, [dispatch, userName]);

	return (
		<>
			<Navigation />
			<UserProfileContainer
				getInfoPosts={getInfoPosts}
				infoType={'userInfo'}
				postsType={'userPosts'}
			/>
			<div className="modal_root"></div>
		</>
	);
};

export default User;