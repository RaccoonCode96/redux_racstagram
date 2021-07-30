import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import PostContainer from '../../components/Post/PostContainer';
import { getAllPostsThunk } from '../../redux/modules/post';
import './Home.scss';

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
			<div className="modal_location"></div>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main">
						<PostContainer posts={posts} />
					</div>
					<div className="side">side</div>
				</div>
			</div>
		</>
	);
};

export default Home;
