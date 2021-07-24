import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileUpdate from '../components/ProfileUpdate';
import { getImageUrlThunk } from '../redux/modules/common';
import { updateProfileThunk } from '../redux/modules/profile';
import { checkDisplayNameThunk } from '../redux/modules/users';

const ProfileUpdateContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { userPhotoUrl, userDisplayName, userIntro } = useSelector(
		(state) => state.users.currentUserInfo
	);

	const exist = useSelector((state) => state.users.checkDisplayName.exist);

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

			// 이름 중복 방어 코드
			if (prevDisplayName !== displayName) {
				if (!exist[1] || exist[1] !== displayName) {
					window.alert('닉네임 중복 확인이 필요 합니다.');
					return;
				}
				if (exist[0]) {
					window.alert(`${exist[1]}은 이미 존재하는 닉네임 입니다.`);
					return;
				}
			}
			// 변경 없을 경우 방어 코드
			if (
				preventSubmit === true ||
				(imageBase64 === prevImageUrl &&
					displayName === prevDisplayName &&
					prevIntro === userIntro)
			) {
				history.replace('/');
				return;
			} else {
				setInputs({ ...inputs, preventSubmit: true });
				if (imageBase64) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
				await dispatch(updateProfileThunk(inputs));
				history.replace('/');
			}
		},
		[dispatch, history, inputs, exist]
	);

	const check = useCallback(
		(displayName) => {
			if (inputs.prevDisplayName !== displayName) {
				dispatch(checkDisplayNameThunk(displayName));
			}
			return;
		},
		[dispatch, inputs]
	);

	return (
		<ProfileUpdate
			onChange={onChange}
			inputs={inputs}
			onSubmit={onSubmit}
			check={check}
			exist={exist}
		/>
	);
};

export default ProfileUpdateContainer;
