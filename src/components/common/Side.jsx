import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Side.scss';
import React from 'react';

const Side = () => {
	const randomUsers = useSelector((state) => state.users.randomUserInfo);

	return (
		<div className="side">
			<div className="recommend">회원님을 위한 추천</div>
			{randomUsers &&
				randomUsers.map((user, i) => (
					<div className="user" key={i.toString()}>
						<div className="user_info">
							<img
								className="user_image"
								src={user.userPhotoUrl}
								alt="random_user_image"
							/>
							<div className="user_name">{user.displayName}</div>
						</div>
						<Link to={`/user/${user.displayName}`} className="visit">
							보기
						</Link>
					</div>
				))}
			<div className="footer">
				<div className="copy">
					© {new Date().getFullYear()} RACSTAGRAM FROM TAEYOUNG (RACCOONCODE)
				</div>
				<a className="link" href="https://goforit.tistory.com/">
					Blog
				</a>
				<a className="link" href="https://github.com/RaccoonCode96">
					Github
				</a>
			</div>
		</div>
	);
};

export default React.memo(Side);
