import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import {
	deletePostThunk,
	getAllPostsThunk,
	getCurrentUserPostsThunk,
	getMorePostsThunk,
	getUserPostsThunk,
	resetGetMorePosts,
} from '../../redux/modules/post';
import Post from './Post';
import UseInfiniteScroll from '../common/UseInfiniteScroll';

const PostContainer = ({ posts }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	// state
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);
	// const { getError, loading } = useSelector((state) => state.post.getMorePosts);
	const { isNone } = useSelector((state) => state.post.getMorePosts);

	// 최초에 게시글 가져왔는지 감지 (이후에 getMorePost 수행하기 위함)
	const isGetUserPosts = useSelector((state) => state.post.getUserPosts.isGet);
	const isGetCurrentUserPosts = useSelector(
		(state) => state.post.getCurrentUserPosts.isGet
	);
	const isGetAllPosts = useSelector((state) => state.post.getAllPosts.isGet);

	// request function
	const deletePost = useCallback(
		(post) => {
			dispatch(deletePostThunk(post));
			if (pathname === '/') {
				dispatch(getAllPostsThunk());
			} else if (pathname === '/profile') {
				dispatch(getCurrentUserPostsThunk());
			} else if (pathname.includes('/user/')) {
				dispatch(getUserPostsThunk(pathname.split('/')[2]));
			}
		},
		[dispatch, pathname]
	);

	const updatePost = useCallback(
		(post) => {
			history.push({
				pathname: '/update',
				state: { post, profileInfo: {}, type: 'post' },
			});
		},
		[history]
	);

	const getMorePosts = useCallback(() => {
		const postDate = posts[posts.length - 1]?.postDate;
		if (pathname === '/') {
			dispatch(getMorePostsThunk({ postDate, type: 'allPosts' }));
		} else if (pathname.includes('/profile')) {
			dispatch(getMorePostsThunk({ postDate, type: 'currentUserPosts' }));
		} else if (pathname.includes('/user/')) {
			dispatch(
				getMorePostsThunk({
					postDate,
					type: 'userPosts',
					userName: pathname.split('/')[2],
				})
			);
		} else {
			return;
		}
	}, [dispatch, pathname, posts]);

	useLayoutEffect(() => {
		return () => {
			dispatch(resetGetMorePosts());
		};
	}, [dispatch]);

	return (
		<>
			{posts.map((post) => (
				<Post
					post={post}
					key={post.postId}
					updatePost={updatePost}
					deletePost={deletePost}
					currentUserId={currentUserId}
				/>
			))}
			{!isNone &&
				(isGetAllPosts || isGetCurrentUserPosts || isGetUserPosts) && (
					<UseInfiniteScroll execute={getMorePosts} />
				)}
			{isNone && '더 이상 글이 없습니다.'}
		</>
	);
};

export default PostContainer;
