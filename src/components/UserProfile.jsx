const UserProfile = ({ updateProfile }) => {
	return (
		<>
			<div>UserImage</div>
			<div>UserName</div>
			<div>UserIntroText</div>
			<button onClick={updateProfile}>수정하기</button>
		</>
	);
};

export default UserProfile;
