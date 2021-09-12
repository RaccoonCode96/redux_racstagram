import { TextField } from '@material-ui/core';
import './CommentForm.scss';

// 댓글 입력 Form
const CommentForm = ({ onChange, comment, onSubmit }) => {
	return (
		<form className="comment_form" onSubmit={onSubmit}>
			<TextField
				onChange={onChange}
				value={comment}
				label="댓글"
				variant="outlined"
				className="comment_input"
				size="small"
			/>
			<button
				type="submit"
				className="comment_submit"
				disabled={comment ? false : true}
			>
				작성
			</button>
		</form>
	);
};

export default CommentForm;
