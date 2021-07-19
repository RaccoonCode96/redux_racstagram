import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigationContainer from '../containers/NavigationContainer';
import PostUpdateContainer from '../containers/PostUpdateContainer';
import ProfileUpdateContainer from '../containers/ProfileUpdateContainer';
import { updateSelector } from '../redux/modules/common';
import { resetPost } from '../redux/modules/post';

const Update = () => {
	const dispatch = useDispatch();
	const updateType = useSelector((state) => state.common.updateSelector);
	useEffect(() => {
		return () => {
			dispatch(resetPost());
			dispatch(updateSelector(''));
		};
	}, [dispatch]);
	return (
		<>
			<NavigationContainer />
			{updateType === 'profile' ? (
				<ProfileUpdateContainer />
			) : (
				<PostUpdateContainer />
			)}
		</>
	);
};

export default Update;
