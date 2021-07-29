import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostForm from './PostForm';
import resize from '../../hooks/resize';
import { getImageUrlThunk } from '../../redux/modules/image';
import { createPostThunk } from '../../redux/modules/post';
import { getCurrentUserInfoThunk } from '../../redux/modules/users';

const PostFormContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [inputs, setInputs] = useState({
		imageBase64: '',
		text: '',
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
			if (inputs.preventSubmit === false && inputs.imageBase64) {
				setInputs({ ...inputs, preventSubmit: true });
				await dispatch(getImageUrlThunk(inputs.imageBase64));
				await dispatch(createPostThunk(inputs.text));
				history.replace('/');
			}
		},
		[dispatch, inputs, history]
	);

	useEffect(() => {
		dispatch(getCurrentUserInfoThunk());
	}, [dispatch]);

	return <PostForm onChange={onChange} inputs={inputs} onSubmit={onSubmit} />;
};

export default PostFormContainer;
