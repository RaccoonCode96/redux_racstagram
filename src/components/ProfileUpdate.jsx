const ProfileUpdate = ({ onChange, inputs, onSubmit, check, exist }) => {
	const { userIntro, imageBase64, displayName, prevDisplayName } = inputs;
	console.log('profileUpdate');
	return (
		<>
			{imageBase64 ? (
				<img src={imageBase64} alt="preview_image" width="300px" />
			) : (
				<></>
			)}

			<form onSubmit={onSubmit}>
				<input
					type="file"
					name="file"
					accept=".jpg, .png"
					onChange={onChange}
				/>
				<textarea
					name="userIntro"
					value={userIntro}
					wrap="hard"
					maxLength={120}
					cols="20"
					rows="2"
					onChange={onChange}
					required
					placeholder="Profile Info"
				></textarea>
				<input
					type="text"
					name="displayName"
					placeholder="Nickname"
					required
					value={displayName}
					onChange={onChange}
				/>
				<span>
					{prevDisplayName === displayName
						? 'OK!'
						: !exist[1] || displayName !== exist[1]
						? '중복 확인이 필요합니다.'
						: exist[0]
						? `${exist[1]}는 이미 존재하는 이름 입니다!`
						: 'OK!'}
				</span>
				<button
					onClick={(event) => {
						event.preventDefault();
						check(displayName);
					}}
				>
					닉네임 중복 검사
				</button>
				<span></span>
				<input type="submit" value="수정" />
			</form>
		</>
	);
};

export default ProfileUpdate;
