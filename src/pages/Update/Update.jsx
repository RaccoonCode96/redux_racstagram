import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import PostUpdateContainer from '../../components/PostUpdate/PostUpdateContainer';
import ProfileUpdateContainer from '../../components/ProfileUpdate/ProfileUpdateContainer';
import { resetPost } from '../../redux/modules/post';

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
			<div className="page">
				<div className="inner">
					{type === 'profile' ? (
						<ProfileUpdateContainer profileInfo={profileInfo} />
					) : (
						<PostUpdateContainer post={post} />
					)}
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Update;
