const UserProfile = ({ updateProfile, profileInfo }) => {
	const { userPhotoUrl, userDisplayName, userIntro } = profileInfo;
	return (
		<>
			<img src={userPhotoUrl} alt="userPhotoUrl" width="300px" />
			<div>{userDisplayName}</div>
			<textarea readOnly disabled value={userIntro}></textarea>
			<button onClick={updateProfile}>수정하기</button>
		</>
	);
};

export default UserProfile;
