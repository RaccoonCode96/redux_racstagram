import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import {
	deletePostThunk,
	getAllPostsThunk,
	getCurrentUserPostsThunk,
	getMorePostsThunk,
	getUserPostsThunk,
} from '../../redux/modules/post';
import Post from './Post';
import { CircularProgress } from '@material-ui/core';

const PostContainer = ({ posts }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const target = useRef(null);

	// state
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);
	const { getError, loading } = useSelector((state) => state.post.getMorePosts);

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

	const _onIntersect = useCallback(
		([{ isIntersecting }]) => {
			if (getError.message) {
				return;
			}
			if (isIntersecting) {
				getMorePosts();
			}
		},
		[getMorePosts, getError]
	);

	useEffect(() => {
		let observer;
		// 더이상 불러올 자료가 없는 경우
		if (getError.message) {
			observer && observer.disconnect();

			// target이 있고,
		} else if (target && posts.length) {
			observer = new IntersectionObserver(_onIntersect, {
				rootMargin: `1px`,
				threshold: 0.5,
			});
			observer.observe(target.current);
		}
		return () => {
			observer && observer.disconnect();
		};
	}, [getError, _onIntersect, posts]);

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
			<div ref={target}></div>
			{loading && <CircularProgress />}
			{getError?.message && '가져올 데이터가 업습니다.'}
		</>
	);
};

export default React.memo(PostContainer);
