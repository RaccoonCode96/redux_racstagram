import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';

import Navigation from '../../components/common/Navigation';
import { useLayoutEffect } from 'react';
const Profile = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
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
