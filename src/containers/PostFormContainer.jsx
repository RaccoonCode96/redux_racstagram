import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { getImageUrlThunk } from '../redux/modules/common';
import { setPostObjThunk } from '../redux/modules/post';
import { getCurrentUserInfoThunk } from '../redux/modules/users';

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
						setInputs({ ...inputs, imageBase64: result });
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
				await dispatch(setPostObjThunk(inputs.text));
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
