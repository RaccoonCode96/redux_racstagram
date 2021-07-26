import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Posts from '../components/Posts';
import ProfilePostImages from '../components/ProfilePostImages';
import UserProfile from '../components/UserProfile';
import { updateSelector } from '../redux/modules/common';
import { getProfilePostThunk } from '../redux/modules/profile';
import { getCurrentUserInfoThunk } from '../redux/modules/users';

const UserProfileContainer = () => {
	const dispatch = useDispatch();
	const profileInfo = useSelector((state) => state.users.currentUserInfo);
	const profilePostList = useSelector((state) => state.profile.profilePostList);
	const history = useHistory();

	const getProfile = useCallback(async () => {
		dispatch(getCurrentUserInfoThunk());
		dispatch(getProfilePostThunk());
	}, [dispatch]);
	useEffect(() => {
		getProfile();
	}, [getProfile]);

	const updateProfile = useCallback(() => {
		dispatch(updateSelector('profile'));
		history.push('/update');
	}, [dispatch, history]);

	const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
	const postsOnToggle = useCallback(() => {
		setPostOn({ ...postOn, isOn: !postOn.isOn });
	}, [setPostOn, postOn]);
	return (
		<>
			{postOn.isOn ? (
				<Posts postList={profilePostList} postsOnToggle={postsOnToggle} />
			) : (
				<>
					<UserProfile
						updateProfile={updateProfile}
						profileInfo={profileInfo}
					/>
					<ProfilePostImages
						profilePostList={profilePostList}
						postsOnToggle={postsOnToggle}
					/>
				</>
			)}
		</>
	);
};

export default UserProfileContainer;
