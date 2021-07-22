import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Post from '../components/Post';
import {
	deletePostThunk,
	getPostListThunk,
	selectPost,
} from '../redux/modules/post';

const PostContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);
	const postList = useSelector((state) => state.post.postList);

	const getPost = useCallback(() => {
		dispatch(getPostListThunk());
	}, [dispatch]);

	const deletePost = useCallback(
		(post) => {
			dispatch(selectPost(post));
			dispatch(deletePostThunk());
		},
		[dispatch]
	);

	const updatePost = useCallback(
		(post) => {
			dispatch(selectPost(post));
			history.push('/update');
		},
		[dispatch, history]
	);

	useEffect(() => {
		getPost();
	}, [getPost]);

	return (
		<>
			<div>Posts</div>
			{postList.map((post) => (
				<Post
					post={post}
					key={post.postId}
					updatePost={updatePost}
					deletePost={deletePost}
					currentUserId={currentUserId}
				/>
			))}
		</>
	);
};

export default PostContainer;
