import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import PostContainer from '../../components/Post/PostContainer';
import useScroll from '../../hooks/useScroll';
import {
	deletePostThunk,
	getAllPostsThunk,
	getMorePostsThunk,
} from '../../redux/modules/post';

const Home = () => {
	const dispatch = useDispatch();

	// 처음에 가져오는 글 6개 (무한스크롤 진입점)
	const allPosts = useSelector((state) => state.post.allPosts);

	// 최초에 게시글 가져왔는지 감지 (이후에 getMorePost 수행하기 위함)
	const isGetAllPosts = useSelector((state) => state.post.getAllPosts.isGet);

	// Set prev scroll Y
	useScroll();

	// Delete
	const deletePost = useCallback(
		(post) => {
			dispatch(deletePostThunk(post));
			dispatch(getAllPostsThunk());
		},
		[dispatch]
	);

	// GetMorePosts
	const getMorePosts = useCallback(() => {
		const postDate = allPosts[allPosts.length - 1]?.postDate;
		dispatch(getMorePostsThunk({ postDate, type: 'allPosts' }));
	}, [dispatch, allPosts]);

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<div className="main">
						<PostContainer
							posts={allPosts}
							isGet={isGetAllPosts}
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

export default Home;
