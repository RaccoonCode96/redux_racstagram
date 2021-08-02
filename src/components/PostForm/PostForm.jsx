import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostForm.scss';
import React from 'react';

const PostForm = ({ onChange, inputs, onSubmit, currentUserInfo }) => {
	const { text, imageBase64 } = inputs;
	const { userPhotoUrl, userDisplayName } = currentUserInfo;

	return (
		<form onSubmit={onSubmit} className="post_form">
			<div className="image_container">
				{imageBase64 ? (
					<>
						<img
							src={imageBase64}
							alt="preview_image"
							className="preview_image"
						/>
					</>
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
					required
					onChange={onChange}
				/>
			</div>
			<div className="text_container">
				<div className="profile_container">
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
					required
					maxLength={120}
					onChange={onChange}
					className="text_input"
				></textarea>
				<input type="submit" value="글쓰기" className="btn_blue" />
			</div>
		</form>
	);
};

export default PostForm;
