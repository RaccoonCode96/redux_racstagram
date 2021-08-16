import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import CommentFormContainer from '../../components/CommentForm/CommentFormContainer';
import Navigation from '../../components/common/Navigation';
import Side from '../../components/common/Side';

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
							{comments.map((commentObj) => (
								<Comment commentObj={commentObj} key={commentObj.commentId} />
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
