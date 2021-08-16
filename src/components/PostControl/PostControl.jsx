import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostControl.scss';

const PostControl = ({ goComments }) => {
	return (
		<div className="post_control_container">
			<button className="post_control_btn">
				<FontAwesomeIcon icon={faHeart} className="icon" />
			</button>
			<button className="post_control_btn" onClick={goComments}>
				<FontAwesomeIcon icon={faComment} className="icon" />
			</button>
		</div>
	);
};

export default PostControl;
