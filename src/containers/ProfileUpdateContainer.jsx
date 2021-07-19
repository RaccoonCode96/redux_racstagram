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
	const { photoURL, displayName } = useSelector(
		(state) => state.profile.currentUser
	);
	const [inputs, setInputs] = useState({
		text: '',
		prevDisplayName: displayName,
		displayName,
		prevImageUrl: photoURL,
		imageBase64: photoURL,
		preventSubmit: false,
	});

	const onChange = useCallback(
		(event) => {
			const { name, value, files } = event.target;
			if (name === 'text') {
				setInputs({
					...inputs,
					text: value,
				});
			} else if (name === 'file') {
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
			} = inputs;
			// 방어 코드
			if (
				preventSubmit === true ||
				(imageBase64 === prevImageUrl && displayName === prevDisplayName)
			) {
				history.push('/');
				return;
			} else {
				setInputs({ ...inputs, preventSubmit: true });
				if (imageBase64) {
					await dispatch(getImageUrlThunk(imageBase64));
				}
				await dispatch(updateProfileThunk(inputs));
				setInputs({ ...inputs, preventSubmit: false });
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
