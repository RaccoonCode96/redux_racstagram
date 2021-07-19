import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostUpdate from '../components/PostUpdate';
import { getImageUrlThunk } from '../redux/modules/common';
import { updatePostThunk } from '../redux/modules/post';

const PostUpdateContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { postImageUrl, postText, postId, userId } = useSelector(
		(state) => state.post.postSelector
	);
	const [inputs, setInputs] = useState({
		imageBase64: postImageUrl,
		prevImageUrl: postImageUrl,
		prevText: postText,
		text: postText,
		postId,
		userId,
		preventSubmit: false,
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
			// 이미지가 있고 없고 분류 처리 필요
			const { preventSubmit, imageBase64, prevImageUrl, text, prevText } =
				inputs;
			if (
				preventSubmit === true ||
				(text === prevText && imageBase64 === prevImageUrl)
			) {
				history.push('/');
				return;
			} else {
				// submit false 이고 이전 값과 같지 않으면
				setInputs({ ...inputs, preventSubmit: true });
				// 이전과 같진 않지만, 값이 있는 경우
				if (imageBase64) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
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
