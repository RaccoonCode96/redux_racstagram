import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import resize from '../../hooks/resize';
import { getImageUrlThunk } from '../../redux/modules/image';
import {
	createPostThunk,
	getAllPostsThunk,
	getUserPostsThunk,
} from '../../redux/modules/post';
import { useHistory } from 'react-router-dom';

const PostFormContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	// 현재 유저 정보 가져오기
	const currentUserInfo = useSelector((state) => state.users.currentUserInfo);

	// 게시글 수정을 위한 input state
	const [inputs, setInputs] = useState({
		imageBase64: '',
		text: '',
		preventSubmit: false,
	});

	// 게시글 수정에서 발생하는 오류 state
	const [postFormError, setPostFormError] = useState('');

	// error confirm 창 (외부 또는 확인 클릭 시 false로 변경)
	const errorToggle = useCallback(() => {
		setPostFormError(!postFormError);
	}, [postFormError]);

	// 게시글 input 항목 onChange event Handler
	const onChange = useCallback(
		(event) => {
			const { name, value, files } = event.target;
			// input type file인 경우
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
				// input type text인 경우
			} else if (name === 'text') {
				setInputs({ ...inputs, text: value });
			}
		},
		[inputs]
	);

	// onSubmit event Handler (게시글 작성 요청)
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
				await dispatch(getUserPostsThunk(currentUserInfo.displayName));
				history.replace('/');
			}
		},
		[dispatch, inputs, history, currentUserInfo]
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
