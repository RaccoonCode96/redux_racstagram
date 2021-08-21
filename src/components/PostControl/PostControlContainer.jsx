import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCommentsThunk } from '../../redux/modules/comment';
import { setLikeOffThunk, setLikeOnThunk } from '../../redux/modules/like';
import PostControl from './PostControl';

const PostControlContainer = ({ post }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const likes = useSelector((state) => state.like.likes);

	const findLike = useCallback(() => {
		const like = likes.find((like) => like.postId === post.postId);
		return like;
	}, [likes, post]);

	const initIsLike = useMemo(() => findLike()?.isLike, [findLike]);

	const [isLike, setLike] = useState(initIsLike);

	const toggleDebounce = useMemo(
		() =>
			debounce((checked) => {
				if (initIsLike !== checked) {
					if (checked) {
						dispatch(setLikeOnThunk(post.postId));
						console.log('setLike : On');
					} else {
						dispatch(setLikeOffThunk(post.postId));
						console.log('setLike : Off');
					}
				}
			}, 900),
		[initIsLike, dispatch, post]
	);

	const onChange = useCallback(
		(event) => {
			const {
				target: { checked },
			} = event;
			setLike(checked);
			toggleDebounce(checked);
		},
		[toggleDebounce]
	);

	const goComments = useCallback(async () => {
		await dispatch(getCommentsThunk(post.postId));
		history.push({ pathname: `/${post.postId}/comments`, state: { post } });
	}, [dispatch, history, post]);

	return (
		<PostControl
			postId={post.postId}
			goComments={goComments}
			isLike={isLike}
			onChange={onChange}
		/>
	);
};

export default PostControlContainer;
