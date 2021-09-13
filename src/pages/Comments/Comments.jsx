import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import CommentFormContainer from '../../components/CommentForm/CommentFormContainer';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import { Link } from 'react-router-dom';

// 댓글 페이지
const Comments = () => {
	// 해당 글 정보를 가져옴
	const {
		state: { post },
	} = useLocation();

	// 선택한 post에 해당하는 댓글들 Redux state (요청으로 인해 가져온 댓글들)
	const comments = useSelector((state) => state.comment.comments);

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<main className="main comments_main">
						<ul className="comments">
							<li className="post_text_container">
								<img
									className="post_user_image"
									src={post.userPhotoUrl}
									alt="postUser_image"
								/>
								<div className="post_info">
									<span className="post_text">
										<Link
											to={`/user/${post.userDisplayName}`}
											className="user_name"
										>
											{post.userDisplayName}
										</Link>
										{post.postText}
									</span>
								</div>
							</li>
							{comments.map((commentObj) => (
								<Comment
									postId={post.postId}
									commentObj={commentObj}
									key={commentObj.commentId}
								/>
							))}
						</ul>
						<CommentFormContainer postId={post.postId} />
					</main>
					<Side />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Comments;
