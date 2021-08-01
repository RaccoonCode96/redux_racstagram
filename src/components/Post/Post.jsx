import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';
import './Post.scss';

const Post = ({ post, deletePost, updatePost, currentUserId }) => {
	const [isOn, setIsOn] = useState(false);
	const toggle = () => {
		setIsOn(!isOn);
	};
	return (
		<>
			<div className="post">
				<>
					<div className="writer">
						<Link
							to={
								currentUserId === post.userId
									? `profile`
									: `user/${post.userDisplayName}`
							}
							className="user_info"
						>
							<img
								alt="user_img"
								className="user_img"
								src={post.userPhotoUrl}
								width="32px"
								height="32px"
							/>
							<h4 className="user_name">{post.userDisplayName}</h4>
						</Link>
						<button className="menu" onClick={toggle}>
							<FontAwesomeIcon icon={faEllipsisH} size="1x" />
						</button>
					</div>
					<div className="post_img_container">
						{post.postImageUrl && (
							<img
								className="post_img"
								src={post.postImageUrl}
								alt="rweet img"
							/>
						)}
					</div>
					<div className="post_text_container">
						<div className="post_text">
							<span className="post_text_userName">{post.userDisplayName}</span>
							{post.postText}
						</div>
					</div>
				</>
			</div>
			<Modal isOn={isOn} toggle={toggle}>
				{currentUserId === post.userId ? (
					<>
						<button
							className="item"
							onClick={() => {
								deletePost(post);
							}}
						>
							삭제하기
						</button>
						<button
							className="item"
							onClick={() => {
								updatePost(post);
							}}
						>
							수정하기
						</button>
					</>
				) : (
					<></>
				)}
				<button className="item" onClick={toggle}>
					취 소
				</button>
			</Modal>
		</>
	);
};

export default Post;
