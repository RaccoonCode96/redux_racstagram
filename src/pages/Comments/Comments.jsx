import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import CommentFormContainer from '../../components/CommentForm/CommentFormContainer';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';
import { Link } from 'react-router-dom';

const Comments = () => {
	const {
		state: { post },
	} = useLocation();
	const comments = useSelector((state) => state.comment.comments);

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<main className="main comments_main">
						<CommentFormContainer postId={post.postId} />
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
					</main>
					<Side />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Comments;
