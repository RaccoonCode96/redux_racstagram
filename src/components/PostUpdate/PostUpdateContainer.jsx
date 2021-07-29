import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostUpdate from './PostUpdate';
import resize from '../../hooks/resize';
import { getImageUrlThunk } from '../../redux/modules/image';
import { updatePostThunk } from '../../redux/modules/post';

const PostUpdateContainer = ({ post }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { postImageUrl, postText, postId, userId } = post;
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
				if (files[0]) {
					const theFile = files[0];
					const reader = new FileReader();
					reader.onloadend = (finishedEvent) => {
						const {
							currentTarget: { result },
						} = finishedEvent;
						const img = new Image();
						img.src = result;
						img.onload = (event) => {
							const dataUrl = resize(img, 600);
							setInputs({ ...inputs, imageBase64: dataUrl });
						};
					};
					reader.readAsDataURL(theFile);
				} else {
					setInputs({ ...inputs, imageBase64: inputs.prevImageUrl });
				}
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
				history.replace('/');
				return;
			} else {
				// submit false 이고 이전 값과 같지 않으면
				setInputs({ ...inputs, preventSubmit: true });
				// 이전과 같진 않지만, 값이 있는 경우
				if (imageBase64 !== prevImageUrl) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
				await dispatch(updatePostThunk(inputs));
				history.replace('/');
			}
		},
		[dispatch, inputs, history]
	);
	return <PostUpdate onChange={onChange} inputs={inputs} onSubmit={onSubmit} />;
};

export default PostUpdateContainer;
