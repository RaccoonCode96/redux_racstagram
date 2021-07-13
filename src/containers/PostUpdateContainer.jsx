import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostUpdate from '../components/PostUpdate';
import { getImageUrlThunk, updatePostThunk } from '../redux/modules/post';

const PostUpdateContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post.postSelector);
	const [inputs, setInputs] = useState({
		imageBase64: post.postImageUrl,
		text: post.postText,
		preventSubmit: false,
		postId: post.postId,
		prevImageUrl: post.postImageUrl,
		userId: post.userId,
	});

	const onChange = useCallback(
		(event) => {
			const { name, value, files } = event.target;
			if (name === 'file') {
				const theFile = files[0];
				const reader = new FileReader();
				reader.onloadend = (finishedEvent) => {
					const {
						currentTarget: { result },
					} = finishedEvent;
					setInputs({ ...inputs, imageBase64: result });
				};
				reader.readAsDataURL(theFile);
			} else if (name === 'text') {
				setInputs({ ...inputs, text: value });
			}
		},
		[inputs]
	);

	const onSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			if (inputs.preventSubmit === false && inputs.imageBase64) {
				setInputs({ ...inputs, preventSubmit: true });
				await dispatch(getImageUrlThunk(inputs.imageBase64));
				await dispatch(updatePostThunk(inputs));
				setInputs({ ...inputs, preventSubmit: false });
				history.push('/');
			}
		},
		[dispatch, inputs, history]
	);
	return <PostUpdate onChange={onChange} inputs={inputs} onSubmit={onSubmit} />;
};

export default PostUpdateContainer;
