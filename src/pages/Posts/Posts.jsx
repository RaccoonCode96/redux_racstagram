import { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import PostContainer from '../../components/Post/PostContainer';
import { resetGetMorePosts } from '../../redux/modules/post';

const Posts = () => {
	const {
		pathname,
		state: { postNum },
	} = useLocation();
	const { currentUserPosts, userPosts } = useSelector((state) => state.post);
	const targetRef = useRef();
	const dispatch = useDispatch();
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
	const selectPosts = useCallback(() => {
		if (pathname.includes('/user/')) {
			return userPosts;
		} else if (pathname.includes('/profile/posts')) {
			return currentUserPosts;
		}
	}, [pathname, userPosts, currentUserPosts]);

	useEffect(() => {
		scrollToPost(postNum);
		return () => {
			dispatch(resetGetMorePosts());
		};
	}, [postNum, dispatch]);
	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main" ref={targetRef}>
						<PostContainer posts={selectPosts()} />
					</div>
					<Side />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Posts;
