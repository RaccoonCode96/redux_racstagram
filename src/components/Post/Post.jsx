import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Confirm from '../common/Confirm';
import Modal from '../common/Modal';
import './Post.scss';
import React from 'react';
import PostControlContainer from '../PostControl/PostControlContainer';

const Post = ({ post, deletePost, updatePost, currentUserId }) => {
	const [isOn, setIsOn] = useState(false);
	const toggle = () => {
		setIsOn(!isOn);
	};
	const [confirmIsOn, setConfirmIsOn] = useState(false);
	const confirmToggle = () => {
		setConfirmIsOn(!confirmIsOn);
	};
	return (
		<>
			<div className="post">
				<>
					<div className="writer">
						<Link
							to={
								currentUserId === post.userId
									? `/profile`
									: `/user/${post.userDisplayName}`
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
						<button className="post_menu" onClick={toggle}>
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
					<PostControlContainer post={post} />
					<div className="post_text_container">
						<div className="post_text">
							<span className="post_text_userName">{post.userDisplayName}</span>
							{post.postText}
						</div>
					</div>
				</>
			</div>
			<Modal isOn={isOn} toggle={toggle} rowNum={3}>
				{currentUserId === post.userId ? (
					<>
						<button className="item" onClick={confirmToggle}>
							삭제하기
						</button>
						<Confirm
							isOn={confirmIsOn}
							toggle={confirmToggle}
							message={'정말 삭제하시겠습니까?'}
						>
							<button
								className="confirm_item"
								onClick={(e) => {
									deletePost(post);
								}}
							>
								예
							</button>
							<button className="confirm_item" onClick={confirmToggle}>
								아니오
							</button>
						</Confirm>
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

export default React.memo(Post);
