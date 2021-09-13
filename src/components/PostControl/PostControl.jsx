import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostControl.scss';

// 좋아요와 댓글 보기로 이동 역할을 하는 영역
const PostControl = ({ postId, toComments, isLike, onChange }) => {
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
			<button className="post_control_btn" onClick={toComments}>
				<FontAwesomeIcon icon={faComment} className="icon" />
			</button>
		</div>
	);
};

export default PostControl;
