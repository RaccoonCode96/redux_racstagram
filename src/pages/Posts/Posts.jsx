import { useCallback, useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import PostContainer from '../../components/Post/PostContainer';
import {
	deletePostThunk,
	getMorePostsThunk,
	getUserPostsThunk,
} from '../../redux/modules/post';

const Posts = () => {
	const {
		state: { postNum },
	} = useLocation();

	const targetRef = useRef();
	const dispatch = useDispatch();

	const { userName } = useParams();
	const { userPosts } = useSelector((state) => state.post);
	const isGetUserPosts = useSelector((state) => state.post.getUserPosts.isGet);

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

	const deletePost = useCallback(
		(post) => {
			dispatch(deletePostThunk(post));
			dispatch(getUserPostsThunk(userName));
		},
		[dispatch, userName]
	);

	const getMorePosts = useCallback(() => {
		const postDate = userPosts[userPosts.length - 1]?.postDate;
		dispatch(
			getMorePostsThunk({
				postDate,
				type: 'userPosts',
				userName,
			})
		);
	}, [dispatch, userPosts, userName]);

	useLayoutEffect(() => {
		scrollToPost(postNum);
	}, [postNum, dispatch]);

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main" ref={targetRef}>
						<PostContainer
							posts={userPosts}
							isGet={isGetUserPosts}
							deletePost={deletePost}
							getMorePosts={getMorePosts}
						/>
					</div>
					<Side />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Posts;
