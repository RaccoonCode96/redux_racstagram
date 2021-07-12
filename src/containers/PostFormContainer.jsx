import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { getImageUrlThunk, setPostObjThunk } from '../redux/modules/post';

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
				const theFile = files[0];
				const reader = new FileReader();
				reader.onloadend = (finishedEvent) => {
					const {
						currentTarget: { result },
					} = finishedEvent;
					setInputs({ ...inputs, imageBase64: result });
				};
				reader.readAsDataURL(theFile);
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
				setInputs({ ...inputs, preventSubmit: false });
				history.push('/');
			}
		},
		[dispatch, inputs, history]
	);
	return <PostForm onChange={onChange} inputs={inputs} onSubmit={onSubmit} />;
};

export default PostFormContainer;
