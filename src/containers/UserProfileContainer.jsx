import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfilePostImages from '../components/ProfilePostImages';
import UserProfile from '../components/UserProfile';
import PostContainer from './PostContainer';

const UserProfileContainer = ({ getInfoPosts, postsType, infoType }) => {
	useEffect(() => {
		getInfoPosts();
	}, [getInfoPosts]);

	const posts = useSelector((state) => state.post[postsType]);
	const profileInfo = useSelector((state) => state.users[infoType]);
	const history = useHistory();

	const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
	const postsOnToggle = useCallback(() => {
		setPostOn({ ...postOn, isOn: !postOn.isOn });
	}, [setPostOn, postOn]);

	const updateProfile = useCallback(() => {
		history.push({
			pathname: '/update',
			state: { profileInfo, post: [], type: 'profile' },
		});
	}, [history, profileInfo]);

	return (
		<>
			{postOn.isOn ? (
				<PostContainer posts={posts} postsOnToggle={postsOnToggle} />
			) : (
				<>
					<UserProfile
						profileInfo={profileInfo}
						updateProfile={updateProfile}
					/>
					<ProfilePostImages posts={posts} postsOnToggle={postsOnToggle} />
				</>
			)}
		</>
	);
};

export default UserProfileContainer;
