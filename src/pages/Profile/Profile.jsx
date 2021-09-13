import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';

import Navigation from '../../components/common/Navigation';
import { useLayoutEffect } from 'react';

// User의 프로필을 보여주는 page (현재 유저, 특정 유저 포함)
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
