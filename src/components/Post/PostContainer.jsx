import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { resetGetMorePosts, resetUserPosts } from '../../redux/modules/post';
import Post from './Post';
import UseInfiniteScroll from '../common/UseInfiniteScroll';
import { resetGetMoreLikes, resetUserLikes } from '../../redux/modules/like';
import { resetUserInfo } from '../../redux/modules/users';

const PostContainer = ({ posts, isGet, deletePost, getMorePosts }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	// state
	const { isNone } = useSelector((state) => state.post.getMorePosts);

	// 해당 글 수정 페이지 이동 함수
	const updatePost = useCallback(
		(post) => {
			history.push({
				pathname: '/update/post',
				state: { post, profileInfo: {} },
			});
		},
		[history]
	);

	useEffect(() => {
		// dispatch(getAllLikesThunk());
		return () => {
			dispatch(resetUserInfo());
			dispatch(resetUserPosts());
			dispatch(resetUserLikes());
			dispatch(resetGetMorePosts());
			dispatch(resetGetMoreLikes());
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
				/>
			))}
			{!isNone && isGet && <UseInfiniteScroll execute={getMorePosts} />}
			{isNone && '더 이상 글이 없습니다.'}
		</>
	);
};

export default PostContainer;
