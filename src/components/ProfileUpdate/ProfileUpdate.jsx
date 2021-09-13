import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextField } from '@material-ui/core';
import { useCheckDisplayName, useCheckWebsite } from '../../hooks/useChecks';

import './ProfileUpdate.scss';

const ProfileUpdate = ({ onChange, inputs, onSubmit }) => {
	const {
		userIntro,
		imageBase64,
		displayName,
		subDisplayName,
		website,
		prevDisplayName,
	} = inputs;

	// dispalyName 중복 체크 안내 및 결과 Ref 반환
	const checkDisplayName = useCheckDisplayName(prevDisplayName, displayName);

	// website validation 체크 후 안내 code, message, color Ref 반환
	const checkWebsiteRef = useCheckWebsite(website);

	// submit button disable 확인
	const checkDisable = () => {
		if (
			!(
				checkDisplayName.code === 'success' ||
				checkDisplayName.code === 'default'
			)
		) {
			// (dispalyName이 이전과 같거나, 중복 체크에서 성공한 경우)가 아닌 경우 -> disable true (버튼 비활성화)
			return true;
		} else if (checkDisplayName.code === 'empty') {
			// dispalyName이 빈 값인 경우 -> -> disable true (버튼 비활성화)
			return true;
		} else if (
			// (website가 빈 값이거나, 형식검사에서 성공한 경우)가 아닌 경우 -> disable true (버튼 비활성화)
			!(checkWebsiteRef.code === 'empty' || checkWebsiteRef.code === 'success')
		) {
			return true;
		} else {
			return false;
		}
	};

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
					<div className="display_name_container row">
						<div className="label">사용자 이름</div>
						<TextField
							type="text"
							name="displayName"
							placeholder="사용자 이름"
							required
							value={displayName}
							onChange={onChange}
							className="input_display_name"
							variant="outlined"
							size="small"
							helperText={checkDisplayName.helperTextMessage}
							InputProps={{
								className: checkDisplayName.input,
							}}
							FormHelperTextProps={{
								className: checkDisplayName.helperText,
							}}
						/>
					</div>
					<div className="user_intro row">
						<div className="label">소 개</div>
						<TextField
							name="userIntro"
							value={userIntro}
							wrap="hard"
							maxLength={120}
							minRows={3}
							maxRows={4}
							onChange={onChange}
							placeholder="소개를 작성해 주세요. (최대 4줄 및 64자)"
							className="input_user_intro"
							multiline
							variant="outlined"
							size="medium"
						/>
					</div>
					<div className="sub_name row">
						<div className="label">이 름</div>
						<TextField
							type="text"
							name="subDisplayName"
							placeholder="이름"
							value={subDisplayName}
							onChange={onChange}
							className="input_sub_name"
							variant="outlined"
							size="small"
						/>
					</div>
					<div className="website row">
						<div className="label">웹 사이트</div>
						<TextField
							type="text"
							name="website"
							placeholder="https:// 또는 http://를 포함시켜 주세요"
							value={website}
							onChange={onChange}
							className="input_website"
							variant="outlined"
							size="small"
							helperText={checkWebsiteRef.helperTextMessage}
							InputProps={{
								className: checkWebsiteRef.input,
							}}
							FormHelperTextProps={{
								className: checkWebsiteRef.helperText,
							}}
						/>
					</div>
					<Button
						variant="contained"
						className="update_btn"
						color="primary"
						type="submit"
						disableElevation
						disabled={checkDisable()}
					>
						수정
					</Button>
				</div>
			</form>
		</>
	);
};

export default ProfileUpdate;
