import { useLocation } from 'react-router-dom';
import Navigation from '../../components/common/Navigation';
import PostUpdateContainer from '../../components/PostUpdate/PostUpdateContainer';
import ProfileUpdateContainer from '../../components/ProfileUpdate/ProfileUpdateContainer';

// 게시글 또는 프로필을 수정하는 경우 사용하는 page
const Update = () => {
	// 현재 path를 통해 구분하여 update 이동시 가져온 profile 또는 post를 상황에 맞는 컴포넌트에 연결하여 보여 줍니다.
	const {
		pathname,
		state: { profileInfo, post },
	} = useLocation();

	return (
		<>
			<Navigation />
			<div className="page">
				<div className="inner">
					{pathname === '/update/profile' ? (
						<ProfileUpdateContainer profileInfo={profileInfo} />
					) : (
						<PostUpdateContainer post={post} />
					)}
				</div>
			</div>
			<div className="modal_root"></div>
		</>
	);
};

export default Update;
