import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '@material-ui/lab/Alert';
import './ProfileUpdate.scss';

const ProfileUpdate = ({ onChange, inputs, onSubmit, check, exist }) => {
	const {
		userIntro,
		imageBase64,
		displayName,
		subDisplayName,
		website,
		prevDisplayName,
	} = inputs;
	return (
		<>
			<form onSubmit={onSubmit} className="update_profile">
				<div className="update_profile_container">
					{imageBase64 ? (
						<img
							src={imageBase64}
							alt="preview_image"
							width="300px"
							className="preview_image"
						/>
					) : (
						<div className="none_image"></div>
					)}
					<input
						type="file"
						name="file"
						id="file_input_profile"
						accept=".jpg, .png"
						onChange={onChange}
					/>
					<div className="current_info">
						<div className="current_dispaly_name">{prevDisplayName}</div>
						<label
							htmlFor="file_input_profile"
							className="change_profile_image"
						>
							<FontAwesomeIcon className="icon_camera" icon={faCamera} />
							프로필 사진 변경
						</label>
					</div>
				</div>
				<div className="info_container">
					<div className="display_name row">
						<div className="label">사용자 이름</div>
						<div className="display_name_container">
							<input
								type="text"
								name="displayName"
								placeholder="사용자 이름"
								required
								value={displayName}
								onChange={onChange}
								className="input_display_name text_input"
							/>
						</div>
					</div>
					<div className="check_display_name_container">
						<div className="block"></div>
						{prevDisplayName === displayName ? (
							<Alert className="alert" severity="success">
								OK!
							</Alert>
						) : !exist[1] || displayName !== exist[1] ? (
							<Alert className="alert" severity="warning">
								중복 확인이 필요합니다.
							</Alert>
						) : exist[0] ? (
							<Alert className="alert" severity="error">
								{exist[1]}는 이미 존재하는 이름 입니다!
							</Alert>
						) : (
							<Alert className="alert" severity="success">
								OK!
							</Alert>
						)}
					</div>
					<div className="user_intro row">
						<div className="label">소 개</div>
						<textarea
							name="userIntro"
							value={userIntro}
							wrap="hard"
							maxLength={120}
							cols="4"
							rows="2"
							onChange={onChange}
							required
							placeholder="소개를 작성해 주세요."
							className="input_user_intro"
						></textarea>
					</div>
					<div className="sub_name row">
						<div className="label">이 름</div>
						<input
							type="text"
							name="subDisplayName"
							placeholder="이름"
							value={subDisplayName}
							onChange={onChange}
							className="input_sub_name text_input"
						/>
					</div>
					<div className="website row">
						<div className="label">웹 사이트</div>
						<input
							type="text"
							name="website"
							placeholder="https:// 또는 http://를 포함시켜 주세요"
							value={website}
							onChange={onChange}
							className="input_website text_input"
						/>
					</div>
					<input className="update_btn" type="submit" value="수정" />
				</div>
			</form>
		</>
	);
};

export default ProfileUpdate;
