import { useLocation } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import './UserProfile.scss';

const UserProfile = ({ profileInfo, updateProfile }) => {
	const { pathname } = useLocation();
	const { userPhotoUrl, userDisplayName, userIntro } = profileInfo;
	const { width } = useWindowSize();

	return (
		<>
			<div className="profile_container">
				<div className="profile_image_container">
					<img
						src={userPhotoUrl}
						alt="userPhotoUrl"
						className="profile_image"
					/>
				</div>
				<div className="profile_info">
					<div className="profile_info_top">
						<div className="profile_name">{userDisplayName}</div>
						{pathname === '/profile' && (
							<button className="profile_edit_btn" onClick={updateProfile}>
								프로필 편집
							</button>
						)}
					</div>
					{width <= 753 ? (
						<></>
					) : (
						<>
							<div className="post_count">
								게시물 <span className="count">0</span>
							</div>
							<div className="profile_info_bottom">
								<h1 className="sub_name">Sub Name</h1>
								<div className="profile_intro">{userIntro}</div>
								<div>
									<a
										className="profile_website"
										rel="noreferrer"
										href="https://goforit.tistory.com/"
										target="_blank"
									>
										블로그
									</a>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			{width > 753 ? (
				<></>
			) : (
				<div className="profile_info">
					<div className="profile_info_bottom">
						<h1 className="sub_name">Sub Name</h1>
						<div className="profile_intro">{userIntro}</div>
						<div>
							<a
								className="profile_website"
								rel="noreferrer"
								href="https://goforit.tistory.com/"
								target="_blank"
							>
								블로그
							</a>
						</div>
					</div>
					<div className="post_count_small">
						게시물 <span className="count">0</span>
					</div>
				</div>
			)}
		</>
	);
};

export default UserProfile;
