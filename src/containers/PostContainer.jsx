import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { getPostListThunk } from '../redux/modules/post';

const PostContainer = () => {
	const dispatch = useDispatch();
	const postList = useSelector((state) => state.post.postList);
	const getPost = useCallback(() => {
		dispatch(getPostListThunk());
	}, [dispatch]);

	useEffect(() => {
		getPost();
	}, [getPost]);
	return (
		<>
			<div>Posts</div>
			{postList.map((post) => (
				<Post post={post} key={post.postId} />
			))}
		</>
	);
};

export default PostContainer;
