import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PostUpdateContainer from '../containers/PostUpdateContainer';
import ProfileUpdateContainer from '../containers/ProfileUpdateContainer';
import { resetPost } from '../redux/modules/post';

const Update = () => {
	const dispatch = useDispatch();
	const {
		state: { profileInfo, post, type },
	} = useLocation();
	useEffect(() => {
		return () => {
			dispatch(resetPost());
		};
	}, [dispatch]);
	return (
		<>
			<Navigation />
			{type === 'profile' ? (
				<ProfileUpdateContainer profileInfo={profileInfo} />
			) : (
				<PostUpdateContainer post={post} />
			)}
		</>
	);
};

export default Update;
