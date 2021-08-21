import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostControl.scss';

const PostControl = ({ postId, goComments, isLike, onChange }) => {
	return (
		<div className="post_control_container">
			<input
				type="checkbox"
				id={`input/${postId}`}
				checked={isLike}
				onChange={onChange}
				className="like_input"
			/>
			<label htmlFor={`input/${postId}`} className="post_control_btn">
				{isLike ? (
					<FontAwesomeIcon icon={farHeart} className="icon onlike" />
				) : (
					<FontAwesomeIcon icon={faHeart} className="icon" />
				)}
			</label>
			<button className="post_control_btn" onClick={goComments}>
				<FontAwesomeIcon icon={faComment} className="icon" />
			</button>
		</div>
	);
};

export default PostControl;
