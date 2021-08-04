import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfilePostImages from '../common/ProfilePostImages';
import UserProfile from './UserProfile';
import PostContainer from '../Post/PostContainer';
import './UserProfileContainer.scss';

const UserProfileContainer = ({ getInfoPosts, postsType, infoType }) => {
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

	useEffect(() => {
		getInfoPosts();
	}, [getInfoPosts]);

	return (
		<div className="user_profile_container">
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
		</div>
	);
};

export default UserProfileContainer;
