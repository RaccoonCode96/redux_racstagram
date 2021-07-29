import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import PostFormContainer from '../../components/PostForm/PostFormContainer';
import { resetPost } from '../../redux/modules/post';

const Write = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(resetPost());
		};
	}, [dispatch]);
	return (
		<>
			<Navigation />
			<PostFormContainer />
		</>
	);
};

export default Write;
