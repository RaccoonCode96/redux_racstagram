import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavigationContainer from '../containers/NavigationContainer';
import PostUpdateContainer from '../containers/PostUpdateContainer';
import { resetPost } from '../redux/modules/post';

const Update = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(resetPost());
		};
	}, [dispatch]);
	return (
		<>
			<NavigationContainer />
			<PostUpdateContainer />
		</>
	);
};

export default Update;
