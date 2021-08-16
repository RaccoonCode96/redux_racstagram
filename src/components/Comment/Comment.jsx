import { Link } from 'react-router-dom';
import './Comment.scss';

const Comment = ({ commentObj }) => {
	const { commentId, comment, userDisplayName, userPhotoUrl } = commentObj;
	return (
		<li className="comment_container" key={commentId}>
			<img src={userPhotoUrl} alt="user_image" className="user_image" />
			<div className="comment_info">
				<Link to={`/user/${userDisplayName}`} className="comment_user_name">
					{userDisplayName}
				</Link>
				<span className="comment">{comment}</span>
			</div>
		</li>
	);
};

export default Comment;
