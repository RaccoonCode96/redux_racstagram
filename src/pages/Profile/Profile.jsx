import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';

import Navigation from '../../components/common/Navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetGetMorePosts } from '../../redux/modules/post';
const Profile = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		window.scrollTo(0, 0);
		return () => {
			dispatch(resetGetMorePosts());
		};
	}, [dispatch]);
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
