import { useLocation } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import './UserProfile.scss';

const UserProfile = ({ profileInfo, updateProfile, postCount }) => {
	const { pathname } = useLocation();
	const { userPhotoUrl, displayName, userIntro, subDisplayName, website } =
		profileInfo;
	const { width } = useWindowSize();
	const websiteMatch = (website) => {
		if (!website) {
			return '';
		}
		const check = website.match(/\/\/([A-Za-z0-9.]+)\/?([A-Za-z0-9]*)/);
		if (!check[2]) {
			return check[1];
		} else {
			return website.match(/\/\/([A-Za-z0-9.]+\/[A-Za-z0-9]+)/)[1];
		}
	};

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
						<div className="profile_name">{displayName}</div>
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
								게시물 <span className="count">{postCount}</span>
							</div>
							<div className="profile_info_bottom">
								<h1 className="sub_name">{subDisplayName}</h1>
								<div className="profile_intro">{userIntro}</div>
								<div>
									<a
										className="profile_website"
										rel="noreferrer"
										href={website}
										target="_blank"
									>
										{websiteMatch(website)}
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
						<h1 className="sub_name">{subDisplayName}</h1>
						<div className="profile_intro">{userIntro}</div>
						<div>
							<a
								className="profile_website"
								rel="noreferrer"
								href={website}
								target="_blank"
							>
								{websiteMatch(website)}
							</a>
						</div>
					</div>
					<div className="post_count_small">
						게시물 <span className="count">{postCount}</span>
					</div>
				</div>
			)}
		</>
	);
};

export default UserProfile;
