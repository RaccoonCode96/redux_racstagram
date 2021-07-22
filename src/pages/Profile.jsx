import NavigationContainer from '../containers/NavigationContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import SignOutContainer from '../containers/SignOutContainer';
const Profile = () => {
	return (
		<>
			<NavigationContainer />
			<UserProfileContainer />
			<SignOutContainer />
		</>
	);
};

export default Profile;
