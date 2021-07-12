import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavigationContainer from '../containers/NavigationContainer';
import PostFormContainer from '../containers/PostFormContainer';
import { resetPost } from '../redux/modules/post';

const Write = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(resetPost());
		};
	}, [dispatch]);
	return (
		<>
			<NavigationContainer />
			<PostFormContainer />
		</>
	);
};

export default Write;
