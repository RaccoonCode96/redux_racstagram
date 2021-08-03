import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import PostFormContainer from '../../components/PostForm/PostFormContainer';
import { resetPost } from '../../redux/modules/post';
import './Write.scss';

const Write = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(resetPost());
		};
	}, [dispatch]);
	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					<PostFormContainer />
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Write;
