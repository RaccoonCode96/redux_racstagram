import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import PostContainer from '../../components/Post/PostContainer';
import { resetGetMorePosts } from '../../redux/modules/post';

const Home = () => {
	const allPosts = useSelector((state) => state.post.allPosts);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(resetGetMorePosts());
		};
	}, [dispatch]);

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main">
						<PostContainer posts={allPosts} />
					</div>
					<Side />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Home;
