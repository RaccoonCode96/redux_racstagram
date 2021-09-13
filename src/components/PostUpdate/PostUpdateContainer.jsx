import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import resize from '../../hooks/resize';
import { getImageUrlThunk } from '../../redux/modules/image';
import { updatePostThunk } from '../../redux/modules/post';
import PostForm from '../PostForm/PostForm';

// 게시글 수정 컴포넌트의 컨테이너
const PostUpdateContainer = ({ post }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUserInfo = useSelector((state) => state.users.currentUserInfo);

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

	// 수정 error confirm 메세지 state
	const [postFormError, setPostFormError] = useState('');

	// 수정 error confirm 상태 변경 함수
	const errorToggle = useCallback(() => {
		setPostFormError(!postFormError);
	}, [postFormError]);

	// 게시글 수정 onChange event Handler
	const onChange = useCallback(
		(event) => {
			const { name, value, files } = event.target;
			// input type이 file인 경우
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
				// input type이 text인 경우
			} else if (name === 'text') {
				setInputs({ ...inputs, text: value });
			}
		},
		[inputs]
	);

	// 게시글 수정 요청 onSubmit Event Handler
	const onSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			const { preventSubmit, imageBase64, prevImageUrl, text, prevText } =
				inputs;
			// validation
			if (!text) {
				setPostFormError('내용을 입력해 주세요.');
				return;
			}
			// 변화가 없는 경우
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

export default PostUpdateContainer;
