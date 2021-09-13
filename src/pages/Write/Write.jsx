import Navigation from '../../components/common/Navigation';
import PostFormContainer from '../../components/PostForm/PostFormContainer';

// 게시글 작성 page
const Write = () => {
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
