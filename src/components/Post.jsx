import { faImage, faUserCircle } from '@fortawesome/free-regular-svg-icons';
// import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Post = ({ post, deletePost, updatePost }) => {
	return (
		<div className="post">
			<>
				<div className="rweet_creator_container">
					<Link to="/user" className="rweet_creator_link">
						{post.userPhotoUrl ? (
							<img
								alt="rweet_creator_img"
								className="rweet_creator_img"
								src={post.userPhotoUrl}
								width="32px"
								height="32px"
							/>
						) : (
							<FontAwesomeIcon
								className="rweet_creator_img"
								icon={faUserCircle}
								size="2x"
							/>
						)}
						<h4 className="rweet_creator_name">{post.userDisplayName}</h4>
					</Link>
					<button
						onClick={() => {
							deletePost(post);
						}}
					>
						삭제
					</button>
					<button
						onClick={() => {
							updatePost(post);
						}}
					>
						수정
					</button>
					{/* <button className="rweet_creator_menu">
						<FontAwesomeIcon icon={faEllipsisH} size="1x" />
					</button> */}
				</div>
				<div className="rweet_img_container">
					<FontAwesomeIcon
						className="rweet_file_btn"
						icon={faImage}
						size="4x"
					/>
					{post.postImageUrl && (
						<img
							className="rweet_img"
							src={post.postImageUrl}
							alt="rweet img"
						/>
					)}
				</div>
				<div className="rweet_text_container">
					<div className="rweet_text">
						<span className="rweet_text_userName">{post.userDisplayName}</span>
						{post.postText}
					</div>
				</div>
			</>
		</div>
	);
};

export default Post;
