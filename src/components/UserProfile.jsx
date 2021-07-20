const UserProfile = ({ updateProfile, profileInfo }) => {
	const { userPhotoUrl, userDisplayName, userIntro } = profileInfo;
	return (
		<>
			<img src={userPhotoUrl} alt="userPhotoUrl" width="300px" />
			<div>{userDisplayName}</div>
			<div>{userIntro}</div>
			<button onClick={updateProfile}>수정하기</button>
		</>
	);
};

export default UserProfile;
