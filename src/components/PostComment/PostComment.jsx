import { Link } from 'react-router-dom';
import './PostComment.scss';

const PostComment = ({ commentEl }) => {
	const { commentDisplayName, comment } = commentEl;
	return (
		<div className="post_comment_container">
			<span className="comment_text">
				<Link className="user_name" to={`/user/${commentDisplayName}`}>
					{commentDisplayName}
				</Link>
				{comment}
			</span>
		</div>
	);
};

export default PostComment;
