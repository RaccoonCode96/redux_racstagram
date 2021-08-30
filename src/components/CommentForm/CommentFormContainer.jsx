import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCommentThunk } from '../../redux/modules/comment';
import CommentForm from './CommentForm';

const CommentFormContainer = ({ postId }) => {
	const dispatch = useDispatch();

	// state (comment)
	const [comment, setComment] = useState('');

	// comment onChange Event Heandler
	const onChange = useCallback((event) => {
		const {
			target: { value },
		} = event;
		setComment(value);
	}, []);

	// comment onSubmit Event Heandler
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
