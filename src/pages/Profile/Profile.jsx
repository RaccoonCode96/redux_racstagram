import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';

import Navigation from '../../components/common/Navigation';
const Profile = () => {
	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<UserProfileContainer />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Profile;
