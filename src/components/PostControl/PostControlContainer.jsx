import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getCommentsThunk } from '../../redux/modules/comment';
import { setLikeOffThunk, setLikeOnThunk } from '../../redux/modules/like';
import PostControl from './PostControl';

const PostControlContainer = ({ post }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const type = useMemo(
		() => (pathname === '/' ? 'allLikes' : 'userLikes'),
		[pathname]
	);
	const likes = useSelector((state) => state.like[type]);

	const findLike = useCallback(() => {
		return likes.find((like) => like.postId === post.postId)?.isLike;
	}, [likes, post]);

	const initIsLike = useMemo(() => findLike(), [findLike]);
	const [isLike, setLike] = useState(initIsLike);

	const toggleDebounce = useMemo(
		() =>
			debounce((checked) => {
				if (initIsLike !== checked) {
					if (checked) {
						dispatch(setLikeOnThunk({ postId: post.postId, type }));
						// console.log('setLike : On');
					} else {
						dispatch(setLikeOffThunk({ postId: post.postId, type }));
						// console.log('setLike : Off');
					}
				}
			}, 900),
		[initIsLike, dispatch, post, type]
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

	const toComments = useCallback(async () => {
		await dispatch(getCommentsThunk(post.postId));
		history.push({ pathname: `/${post.postId}/comments`, state: { post } });
	}, [dispatch, history, post]);

	return (
		<PostControl
			postId={post.postId}
			toComments={toComments}
			isLike={isLike}
			onChange={onChange}
		/>
	);
};

export default PostControlContainer;
