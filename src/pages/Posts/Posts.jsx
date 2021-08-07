import { useLocation } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import PostContainer from '../../components/Post/PostContainer';

const Posts = () => {
	const {
		state: { posts },
	} = useLocation();

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main">
						<PostContainer posts={posts} />
					</div>
					<div className="side">side</div>
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Posts;
