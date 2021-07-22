import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileUpdate from '../components/ProfileUpdate';
import { getImageUrlThunk } from '../redux/modules/common';
import { updateProfileThunk } from '../redux/modules/profile';

const ProfileUpdateContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { userPhotoUrl, userDisplayName, userIntro } = useSelector(
		(state) => state.users.currentUserInfo
	);
	const [inputs, setInputs] = useState({
		prevIntro: userIntro,
		userIntro,
		prevDisplayName: userDisplayName,
		displayName: userDisplayName,
		prevImageUrl: userPhotoUrl,
		imageBase64: userPhotoUrl,
		preventSubmit: false,
	});

	const onChange = useCallback(
		(event) => {
			const { name, value, files } = event.target;
			if (name === 'userIntro') {
				setInputs({
					...inputs,
					userIntro: value,
				});
			} else if (name === 'file') {
				if (files[0]) {
					const theFile = files[0];
					const reader = new FileReader();
					reader.onloadend = (finishedEvent) => {
						const {
							currentTarget: { result },
						} = finishedEvent;
						setInputs({
							...inputs,
							imageBase64: result,
						});
					};
					reader.readAsDataURL(theFile);
				} else {
					// 이미지 선택이 취소되어 없는 경우
					setInputs({ ...inputs, imageBase64: inputs.prevImageUrl });
				}
			} else if (name === 'displayName') {
				setInputs({
					...inputs,
					displayName: value,
				});
			}
		},
		[inputs]
	);

	const onSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			const {
				preventSubmit,
				imageBase64,
				prevImageUrl,
				displayName,
				prevDisplayName,
				userIntro,
				prevIntro,
			} = inputs;
			// 방어 코드
			if (
				preventSubmit === true ||
				(imageBase64 === prevImageUrl &&
					displayName === prevDisplayName &&
					prevIntro === userIntro)
			) {
				history.push('/');
				return;
			} else {
				setInputs({ ...inputs, preventSubmit: true });
				if (imageBase64) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
				await dispatch(updateProfileThunk(inputs));
				history.push('/');
			}
		},
		[dispatch, history, inputs]
	);

	return (
		<ProfileUpdate onChange={onChange} inputs={inputs} onSubmit={onSubmit} />
	);
};

export default ProfileUpdateContainer;
