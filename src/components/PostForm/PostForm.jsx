import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostForm.scss';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Confirm from '../common/Confirm';

const PostForm = ({
	onChange,
	inputs,
	onSubmit,
	currentUserInfo,
	postFormError,
	errorToggle,
}) => {
	const { text, imageBase64 } = inputs;
	const { userPhotoUrl, userDisplayName } = currentUserInfo;
	const { pathname } = useLocation();

	return (
		<>
			<form onSubmit={onSubmit} className="post_form">
				<div className="image_container">
					{imageBase64 ? (
						<img
							src={imageBase64}
							alt="preview_image"
							className="preview_image"
						/>
					) : (
						<div className="none_image">
							<label htmlFor="file_input">
								<FontAwesomeIcon className="icon_camera" icon={faCamera} />
							</label>
						</div>
					)}
					<input
						type="file"
						name="file"
						id="file_input"
						accept="image/*"
						onChange={onChange}
					/>
				</div>
				<div className="text_container">
					<div className="profile_image_container">
						<div className="profile">
							<img
								src={userPhotoUrl}
								alt="Creator_Profile"
								className="user_image"
							/>
							<span className="user_name">{userDisplayName}</span>
						</div>
						<label htmlFor="file_input" className="small_file_input_btn">
							<FontAwesomeIcon className="icon_camera" icon={faCamera} />
						</label>
					</div>
					<textarea
						name="text"
						value={text}
						placeholder="내용을 작성해 주세요"
						wrap="hard"
						maxLength={120}
						onChange={onChange}
						className="text_input"
					></textarea>
					<input
						type="submit"
						value={pathname === '/write' ? '작성하기' : '수정하기'}
						className="btn_blue"
					/>
				</div>
			</form>
			<Confirm
				isOn={postFormError}
				message={postFormError}
				toggle={errorToggle}
			>
				<button onClick={errorToggle} className="confirm_item">
					확인
				</button>
			</Confirm>
		</>
	);
};

export default PostForm;
