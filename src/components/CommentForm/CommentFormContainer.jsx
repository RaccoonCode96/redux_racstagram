import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCommentThunk } from '../../redux/modules/comment';
import CommentForm from './CommentForm';

const CommentFormContainer = ({ postId }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');
	const onChange = useCallback((event) => {
		const {
			target: { value },
		} = event;
		setComment(value);
	}, []);
	const onSubmit = useCallback(
		(event) => {
			event.preventDefault();
			dispatch(setCommentThunk({ postId, comment }));
			setComment('');
		},
		[dispatch, postId, comment]
	);

	return (
		<CommentForm onChange={onChange} comment={comment} onSubmit={onSubmit} />
	);
};

export default CommentFormContainer;
