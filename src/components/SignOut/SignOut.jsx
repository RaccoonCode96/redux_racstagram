const SignOut = ({ onSignOutClick }) => {
	return (
		<button className="profile_btn" onClick={onSignOutClick}>
			Log Out
		</button>
	);
};

export default SignOut;
