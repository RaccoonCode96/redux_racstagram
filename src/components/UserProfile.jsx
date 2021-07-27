import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const UserProfile = ({ profileInfoType, userProfile }) => {
	const { pathname } = useLocation();
	const history = useHistory();
	const profileInfo = useSelector((state) => state.users[profileInfoType]);
	const { userPhotoUrl, userDisplayName, userIntro } = profileInfo;
	const updateProfile = useCallback(() => {
		history.push({
			pathname: '/update',
			state: { profileInfo, post: [], type: 'profile' },
		});
	}, [history, profileInfo]);
	return (
		<>
			<img src={userPhotoUrl} alt="userPhotoUrl" width="300px" />
			<div>{userDisplayName}</div>
			<textarea readOnly disabled value={userIntro}></textarea>
			{pathname === '/profile' && (
				<button onClick={updateProfile}>수정하기</button>
			)}
		</>
	);
};

export default UserProfile;
