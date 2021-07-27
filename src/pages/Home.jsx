import PostContainer from '../containers/PostContainer';
import Navigation from '../components/Navigation';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPostsThunk } from '../redux/modules/post';

const Home = () => {
	console.log('Home');
	const dispatch = useDispatch();
	const getPosts = useCallback(() => {
		dispatch(getAllPostsThunk());
	}, [dispatch]);
	return (
		<>
			<Navigation />
			<PostContainer getPosts={getPosts} postsType={'allPosts'} />
		</>
	);
};

export default Home;
