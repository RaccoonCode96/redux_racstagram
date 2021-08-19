import { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate';
import resize from '../../hooks/resize';
import { getImageUrlThunk } from '../../redux/modules/image';
import { updateProfileThunk } from '../../redux/modules/profile';
import { checkDisplayNameThunk } from '../../redux/modules/users';
import { debounce } from 'lodash';

const ProfileUpdateContainer = ({ profileInfo }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { userPhotoUrl, displayName, userIntro, subDisplayName, website } =
		profileInfo;

	const exist = useSelector((state) => state.users.checkDisplayName.exist);

	const [inputs, setInputs] = useState({
		userIntro,
		displayName,
		imageBase64: userPhotoUrl,
		subDisplayName,
		website,
		prevIntro: userIntro,
		prevDisplayName: displayName,
		prevImageUrl: userPhotoUrl,
		prevSubDisplayName: subDisplayName,
		preventSubmit: false,
		prevWebsite: website,
	});

	const check = useCallback(
		(displayName) => {
			if (inputs.prevDisplayName !== displayName) {
				dispatch(checkDisplayNameThunk(displayName));
			}
			return;
		},
		[dispatch, inputs]
	);

	const debounceCheck = useMemo(
		() =>
			debounce((displayName) => {
				check(displayName);
			}, 700),
		[check]
	);

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
						const img = new Image();
						img.src = result;
						img.onload = (event) => {
							const dataUrl = resize(img, 300);
							setInputs({
								...inputs,
								imageBase64: dataUrl,
							});
						};
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
				debounceCheck(value);
			} else if (name === 'subDisplayName') {
				setInputs({
					...inputs,
					subDisplayName: value,
				});
			} else if (name === 'website') {
				setInputs({
					...inputs,
					website: value,
				});
			}
		},
		[inputs, debounceCheck]
	);

	const onSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			const {
				imageBase64,
				userIntro,
				displayName,
				subDispalyName,
				website,
				prevImageUrl,
				prevIntro,
				prevDisplayName,
				prevSubDisplayName,
				prevWebsite,
				preventSubmit,
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
					userIntro === prevIntro &&
					subDispalyName === prevSubDisplayName &&
					website === prevWebsite)
			) {
				history.replace('/profile');
				return;
			} else {
				setInputs({ ...inputs, preventSubmit: true });
				if (imageBase64) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
				await dispatch(updateProfileThunk(inputs));
				history.replace('/profile');
			}
		},
		[dispatch, history, inputs, exist]
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
