import { Link } from 'react-router-dom';
import './PostComment.scss';

const PostComment = ({ commentEl }) => {
	const { commentDisplayName, comment } = commentEl;
	return (
		<div className="post_comment_container">
			<Link className="user_name" to={`/user/${commentDisplayName}`}>
				{commentDisplayName}
			</Link>
			<span className="comment_text">{comment}</span>
		</div>
	);
};

export default PostComment;
