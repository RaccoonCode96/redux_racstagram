import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCommentsThunk } from '../../redux/modules/comment';
import PostControl from './PostControl';

const PostControlContainer = ({ post }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const goComments = useCallback(async () => {
		await dispatch(getCommentsThunk(post.postId));
		history.push({ pathname: `/${post.postId}/comments`, state: { post } });
	}, []);
	return <PostControl goComments={goComments} />;
};

export default PostControlContainer;
