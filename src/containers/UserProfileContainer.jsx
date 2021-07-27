import { useCallback, useState } from 'react';
import ProfilePostImages from '../components/ProfilePostImages';
import UserProfile from '../components/UserProfile';
import PostContainer from './PostContainer';

const UserProfileContainer = ({
	postsType,
	profileInfoType,
	getPosts,
	getInfo,
}) => {
	// profileInfo : 보여줄 유저 info
	// updateProfile : profile update 할 로직
	// postOn toggle
	const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
	const postsOnToggle = useCallback(() => {
		setPostOn({ ...postOn, isOn: !postOn.isOn });
	}, [setPostOn, postOn]);

	return (
		<>
			{postOn.isOn ? (
				<PostContainer
					getPosts={getPosts}
					postsType={postsType}
					postsOnToggle={postsOnToggle}
				/>
			) : (
				<>
					<UserProfile profileInfoType={profileInfoType} />
					<ProfilePostImages
						postsType={postsType}
						postsOnToggle={postsOnToggle}
					/>
				</>
			)}
		</>
	);
};

export default UserProfileContainer;
