import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import PostContainer from '../../components/Post/PostContainer';
import { getAllPostsThunk } from '../../redux/modules/post';

const Home = () => {
	const posts = useSelector((state) => state.post.allPosts);
	const dispatch = useDispatch();
	const getPosts = useCallback(() => {
		dispatch(getAllPostsThunk());
	}, [dispatch]);
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return (
		<>
			<Navigation />
			<PostContainer posts={posts} />
		</>
	);
};

export default Home;
