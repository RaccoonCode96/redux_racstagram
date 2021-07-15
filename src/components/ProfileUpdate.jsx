const ProfileUpdate = ({ onChange, inputs, onSubmit }) => {
	const { text, imageBase64, displayName } = inputs;

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
					name="text"
					value={text}
					wrap="hard"
					maxLength={120}
					cols="20"
					rows="2"
					onChange={onChange}
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
				<input type="submit" value="수정" />
			</form>
		</>
	);
};

export default ProfileUpdate;
