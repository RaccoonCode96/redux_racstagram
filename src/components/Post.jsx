import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

const Post = ({ post, deletePost, updatePost, currentUserId }) => {
	console.log('post');
	const [isOn, setIsOn] = useState(false);
	const toggle = () => {
		setIsOn(!isOn);
	};
	return (
		<div className="post">
			<>
				<div className="rweet_creator_container">
					<Link
						to={
							currentUserId === post.userId
								? `profile`
								: `user/${post.userDisplayName}`
						}
						className="rweet_creator_link"
					>
						<img
							alt="rweet_creator_img"
							className="rweet_creator_img"
							src={post.userPhotoUrl}
							width="32px"
							height="32px"
						/>
						<h4 className="rweet_creator_name">{post.userDisplayName}</h4>
					</Link>
					<button className="rweet_creator_menu" onClick={toggle}>
						<FontAwesomeIcon icon={faEllipsisH} size="1x" />
					</button>
					<Modal isOn={isOn}>
						{currentUserId === post.userId ? (
							<>
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
							</>
						) : (
							<></>
						)}
						<button onClick={toggle}>나가기</button>
					</Modal>
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
