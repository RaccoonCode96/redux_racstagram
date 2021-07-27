import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import UserProfileContainer from '../containers/UserProfileContainer';
import { getUserPostsThunk } from '../redux/modules/post';
import { getUserInfoThunk } from '../redux/modules/users';

const User = () => {
	let { userName } = useParams();
	const dispatch = useDispatch();

	const getProfile = useCallback(
		async (userName) => {
			dispatch(getUserInfoThunk(userName));
			dispatch(getUserPostsThunk(userName));
		},
		[dispatch]
	);

	useEffect(() => {
		getProfile(userName);
	}, [getProfile, userName]);

	return (
		<>
			<Navigation />
			<UserProfileContainer
				profileInfoType={'userInfo'}
				postsType={'userPosts'}
			/>
		</>
	);
};

export default User;
