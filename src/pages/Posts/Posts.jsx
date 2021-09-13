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

// 특정 유저의 게시글을 디테일하게 보여주는 page (Home과 비슷함)
const Posts = () => {
	const dispatch = useDispatch();

	// Profile의 이미지 테이블에서 클릭한 글이 몇번째인지 가져옴
	const {
		state: { postNum },
	} = useLocation();

	// 게시글을 가지고 있는 부모 요소 Ref
	const targetRef = useRef();

	// 선택한 유저의 이름
	const { userName } = useParams();

	// 선택한 유저의 게시글들
	const { userPosts } = useSelector((state) => state.post);

	// 선택한 유저의 게시글이 최초에 가져와 졌는지 나타내는 state
	const isGetUserPosts = useSelector((state) => state.post.getUserPosts.isGet);

	// 선택한 게시글의 스크롤 위치로 이동시키는 함수
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

	// 게시글 삭제 함수
	const deletePost = useCallback(
		(post) => {
			dispatch(deletePostThunk(post));
			dispatch(getUserPostsThunk(userName));
		},
		[dispatch, userName]
	);

	// 게시글 더 가져오기 함수 (무한 스크롤)
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

	// mount 되고 render 되기 전에 스크롤 위치를 옮기도록 함
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
