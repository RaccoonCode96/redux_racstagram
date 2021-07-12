const PostForm = ({ onChange, inputs, onSubmit }) => {
	const { text } = inputs;
	return (
		<form onSubmit={onSubmit}>
			<input type="file" name="file" accept="image/*" onChange={onChange} />
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
	);
};

export default PostForm;
