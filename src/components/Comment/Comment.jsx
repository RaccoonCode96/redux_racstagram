import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCommentThunk } from '../../redux/modules/comment';
import Confirm from '../common/Confirm';
import './Comment.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Comment = ({ commentObj, postId }) => {
	const { commentId, comment, userDisplayName, userPhotoUrl, userId } =
		commentObj;
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);
	const dispatch = useDispatch();
	const [confirmIsOn, setConfirmIsOn] = useState(false);
	const confirmToggle = () => {
		setConfirmIsOn(!confirmIsOn);
	};

	const deleteComment = useCallback(() => {
		dispatch(deleteCommentThunk({ commentId, postId }));
	}, [dispatch, commentId, postId]);

	return (
		<li className="comment_container" key={commentId}>
			<img src={userPhotoUrl} alt="user_image" className="user_image" />
			<div className="comment_info">
				<span className="comment">
					<Link to={`/user/${userDisplayName}`} className="comment_user_name">
						{userDisplayName}
					</Link>
					{comment}
				</span>
			</div>
			{currentUserId === userId && (
				<button onClick={confirmToggle} className="delete_comment_btn">
					<DeleteForeverIcon className="icon" />
				</button>
			)}
			<Confirm
				isOn={confirmIsOn}
				toggle={confirmToggle}
				message={'정말 삭제하시겠습니까?'}
			>
				<button className="confirm_item" onClick={deleteComment}>
					예
				</button>
				<button className="confirm_item" onClick={confirmToggle}>
					아니오
				</button>
			</Confirm>
		</li>
	);
};

export default Comment;
