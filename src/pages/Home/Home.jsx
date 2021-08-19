import { useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import PostContainer from '../../components/Post/PostContainer';
import useScroll from '../../hooks/useScroll';

const Home = () => {
	const allPosts = useSelector((state) => state.post.allPosts);

	useScroll();

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
