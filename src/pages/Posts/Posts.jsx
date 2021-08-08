import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import PostContainer from '../../components/Post/PostContainer';

const Posts = () => {
	const {
		state: { posts, postNum },
	} = useLocation();
	const targetRef = useRef();
	const scrollToPost = (num) => {
		if (!num) {
			return;
		}
		const top = targetRef.current.children[num].offsetTop;
		// window.scrollBy({
		// 	top: top - 54,
		// 	left: 0,
		// 	behavior: 'smooth',
		// });
		window.scrollTo(0, top - 54);
	};
	useEffect(() => {
		scrollToPost(postNum);
	}, [postNum]);
	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main" ref={targetRef}>
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
