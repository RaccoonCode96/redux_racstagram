import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import SignOutContainer from '../SignOut/SignOutContainer';
import Menu from './Menu';

const Navigation = () => {
	const [isOn, setisOn] = useState(false);
	const userPhotoUrl = useSelector(
		(state) => state.users.currentUserInfo.userPhotoUrl
	);
	const toggle = (event) => {
		setisOn(!isOn);
	};

	return (
		<>
			<div className="nav">
				<div className="nav_inner">
					<div className="logo">Racstagram</div>
					<ul className="items">
						<li className="item">
							<Link to="/">
								<FontAwesomeIcon
									className="icon_home"
									icon={faHome}
									size={'2x'}
								/>
							</Link>
						</li>
						<li className="item">
							<Link to="/write">
								<FontAwesomeIcon
									className="nav_NoPortrait"
									icon={faPlusSquare}
									size="2x"
								/>
							</Link>
						</li>
						<li className="item">
							<img
								src={userPhotoUrl}
								onClick={toggle}
								alt="user_image"
								className="nav_profile_image"
							/>
							<Menu toggle={toggle} isOn={isOn} location={'nav_menu_location'}>
								<Link to="/profile" className="menu_item">
									프로필
								</Link>
								<div className="menu_item">
									<SignOutContainer />
								</div>
								<div className="menu_item" onClick={toggle}>
									나가기
								</div>
							</Menu>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navigation;
