import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Posts from '../components/Posts';
import ProfilePostImages from '../components/ProfilePostImages';
import UserProfile from '../components/UserProfile';
import NavigationContainer from '../containers/NavigationContainer';
import {
	getSeletedUserPostThunk,
	getUserInfoThunk,
} from '../redux/modules/users';

const User = () => {
	let { userName } = useParams();
	const dispatch = useDispatch();

	const userInfo = useSelector((state) => state.users.selectedUserInfo);
	const postList = useSelector((state) => state.users.selectedUserPostList);

	const getProfile = useCallback(
		async (userName) => {
			dispatch(getUserInfoThunk(userName));
			dispatch(getSeletedUserPostThunk(userName));
		},
		[dispatch]
	);

	const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
	const postsOnToggle = useCallback(() => {
		setPostOn({ ...postOn, isOn: !postOn.isOn });
	}, [setPostOn, postOn]);

	useEffect(() => {
		getProfile(userName);
	}, [getProfile, userName]);
	return (
		<>
			<NavigationContainer />
			{postOn.isOn ? (
				<>
					<Posts postList={postList} postsOnToggle={postsOnToggle} />
				</>
			) : (
				<>
					<UserProfile profileInfo={userInfo} />
					<ProfilePostImages
						profilePostList={postList}
						postsOnToggle={postsOnToggle}
					/>
				</>
			)}
		</>
	);
};

export default User;
