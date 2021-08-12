import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import resize from '../../hooks/resize';
import { getImageUrlThunk } from '../../redux/modules/image';
import { createPostThunk, getAllPostsThunk } from '../../redux/modules/post';
import { useHistory } from 'react-router-dom';

const PostFormContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUserInfo = useSelector((state) => state.users.currentUserInfo);
	const [inputs, setInputs] = useState({
		imageBase64: '',
		text: '',
		preventSubmit: false,
	});
	const [postFormError, setPostFormError] = useState('');
	const errorToggle = useCallback(() => {
		setPostFormError(!postFormError);
	}, [postFormError]);

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
					// 이미지 선택이 취소 되어 없는 경우
					setInputs({ ...inputs, imageBase64: '' });
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
			const { text, imageBase64 } = inputs;
			if (!text) {
				setPostFormError('내용을 입력해 주세요.');
				return;
			} else if (!imageBase64) {
				setPostFormError('사진을 올려 주세요.');
				return;
			}
			if (inputs.preventSubmit === false && imageBase64) {
				setInputs({ ...inputs, preventSubmit: true });
				await dispatch(getImageUrlThunk(imageBase64));
				await dispatch(createPostThunk(text));
				await dispatch(getAllPostsThunk());
				history.replace('/');
			}
		},
		[dispatch, inputs, history]
	);

	return (
		<PostForm
			onChange={onChange}
			inputs={inputs}
			onSubmit={onSubmit}
			currentUserInfo={currentUserInfo}
			postFormError={postFormError}
			errorToggle={errorToggle}
		/>
	);
};

export default PostFormContainer;
