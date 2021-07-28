import { useLocation } from 'react-router-dom';

const UserProfile = ({ profileInfo, updateProfile }) => {
	const { pathname } = useLocation();
	const { userPhotoUrl, userDisplayName, userIntro } = profileInfo;

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
