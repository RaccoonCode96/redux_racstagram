const PostForm = ({ onChange, inputs, onSubmit }) => {
	const { text, imageBase64 } = inputs;
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
					accept="image/*"
					required
					onChange={onChange}
				/>
				<textarea
					name="text"
					value={text}
					wrap="hard"
					required
					maxLength={120}
					cols="20"
					rows="2"
					onChange={onChange}
				></textarea>
				<input type="submit" value="작성" />
			</form>
		</>
	);
};

export default PostForm;
