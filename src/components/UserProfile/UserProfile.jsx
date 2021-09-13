import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import './UserProfile.scss';

const UserProfile = ({ profileInfo, updateProfile, postCount }) => {
	const { userName } = useParams();

	// 현재 유저 이름 Redux state
	const currentUserDisplayName = useSelector(
		(state) => state.users.currentUserInfo.displayName
	);

	// 가져온 현재 유저 정보 구조 분해 할당
	const { userPhotoUrl, displayName, userIntro, subDisplayName, website } =
		profileInfo;

	// 현재 브라우저 창 width 가져오기
	const { width } = useWindowSize();

	// 표현될 website 형식 변환
	const websiteMatch = (website) => {
		// 원하는 형식 : 도메인 + 첫번째 path (path는 있으면 표현)

		// website가 없는 경우 빈값 출력
		if (!website) {
			return '';
		}

		// website가 있는 경우 (check[2]을 통해서 path가 있는지 없는지 확인)
		const check = website.match(/\/\/([A-Za-z0-9.]+)\/?([A-Za-z0-9]*)/);

		// path가 없는 경우
		if (!check[2]) {
			return check[1]; // domain만 반환
		} else {
			// path가 있는 경우 -> domain과 path 포함 문자열 반환
			return website.match(/\/\/([A-Za-z0-9.]+\/[A-Za-z0-9]+)/)[1];
		}
	};

	return (
		<>
			<div className="profile_container">
				<div className="profile_image_container">
					{userPhotoUrl && (
						<img
							src={userPhotoUrl}
							alt="userPhotoUrl"
							className="profile_image"
						/>
					)}
				</div>
				<div className="profile_info">
					<div className="profile_info_top">
						<div className="profile_name">{displayName}</div>
						{userName === currentUserDisplayName && (
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
