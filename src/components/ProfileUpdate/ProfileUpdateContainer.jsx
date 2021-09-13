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

	// 유저 이름이 db에 존재하는지를 나타내는 state (0번 index: 검사한 이름, 1번 index: 검사한 이름의 중복 검사 결과)
	const exist = useSelector((state) => state.users.checkDisplayName.exist);

	// 수정할 Profile input 값 관리하는 state
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

	// 이름 중복 검사를 요청하는 함수
	const check = useCallback(
		(displayName) => {
			if (inputs.prevDisplayName !== displayName) {
				dispatch(checkDisplayNameThunk(displayName));
			}
			return;
		},
		[dispatch, inputs]
	);

	// 이름 중복 검사 요청함수를 가진 debounce 함수
	const debounceCheck = useMemo(
		() =>
			debounce((displayName) => {
				check(displayName);
			}, 500),
		[check]
	);

	// Profile 관련 input의 onChange Event Handler
	const onChange = useCallback(
		(event) => {
			const { name, value, files } = event.target;
			// input name이 userIntro 인 경우
			if (name === 'userIntro') {
				setInputs({
					...inputs,
					userIntro: value,
				});
				// input name이 file 인 경우 (type: file)
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
				// input name이 displayName인 경우
			} else if (name === 'displayName') {
				setInputs({
					...inputs,
					displayName: value,
				});
				debounceCheck(value);

				// input name이 SubDisplayName인 경우
			} else if (name === 'subDisplayName') {
				setInputs({
					...inputs,
					subDisplayName: value,
				});

				// input name이 website인 경우
			} else if (name === 'website') {
				setInputs({
					...inputs,
					website: value,
				});
			}
		},
		[inputs, debounceCheck]
	);

	// 최종 Profile 수정 요청 onSubmit event handler
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
				history.replace(`/user/${prevDisplayName}`);
				return;

				// 변경이 하나라도 있는 경우
			} else {
				setInputs({ ...inputs, preventSubmit: true });
				if (imageBase64) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
				await dispatch(updateProfileThunk(inputs));
				history.replace(`/user/${displayName}`);
			}
		},
		[dispatch, history, inputs, exist]
	);

	return (
		<ProfileUpdate onChange={onChange} inputs={inputs} onSubmit={onSubmit} />
	);
};

export default ProfileUpdateContainer;
