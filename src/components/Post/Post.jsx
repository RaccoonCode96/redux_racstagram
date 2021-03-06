import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Confirm from '../common/Confirm';
import Modal from '../common/Modal';
import './Post.scss';
import React from 'react';
import PostControlContainer from '../PostControl/PostControlContainer';
import PostComment from '../PostComment/PostComment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsThunk } from '../../redux/modules/comment';

const Post = ({ post, deletePost, updatePost }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);

	// Post 메뉴 ON & OFF
	const [isOn, setIsOn] = useState(false);
	const toggle = () => {
		setIsOn(!isOn);
	};

	// Post 메뉴의 삭제 확인
	const [confirmIsOn, setConfirmIsOn] = useState(false);
	const confirmToggle = () => {
		setConfirmIsOn(!confirmIsOn);
	};

	// comments 보기 이동
	const toComments = useCallback(async () => {
		await dispatch(getCommentsThunk(post.postId));
		history.push({ pathname: `/${post.postId}/comments`, state: { post } });
	}, [dispatch, post, history]);

	// Post 글 축약 및 더보기
	const shortText = post.postText.slice(0, 35).split(/(\r\n|\n|\r)/gm)[0];
	const moreBtnCheck = () => {
		// 35자 넘거나, 개행이 있는 경우 더보기 버튼 표시
		return post.postText > 35 || /(\r\n|\n|\r)/gm.test(post.postText);
	};
	const [isMore, setMore] = useState(false);

	return (
		<>
			<div className="post">
				<>
					<div className="writer">
						<Link to={`/user/${post.userDisplayName}`} className="user_info">
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
					<div className="post_content_container">
						<div className="post_text_container">
							<span className="post_text">
								<Link
									to={`/user/${post.userDisplayName}`}
									className="user_name"
								>
									{post.userDisplayName}
								</Link>
								{isMore ? post.postText : shortText}
							</span>
							{moreBtnCheck() && !isMore && (
								<button
									className="more_text_btn"
									onClick={(e) => {
										setMore(true);
									}}
								>
									...더 보기
								</button>
							)}
						</div>
						<div className="post_comments">
							{post.commentArray[0] && (
								<button className="comments_count" onClick={toComments}>
									댓글 {post.commentArray[0].count}개 모두 보기
								</button>
							)}
							{post.commentArray.map((commentEl) => (
								<PostComment commentEl={commentEl} key={commentEl.commentId} />
							))}
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
