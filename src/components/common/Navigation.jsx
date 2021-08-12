import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';
import SignOutContainer from '../SignOut/SignOutContainer';
import Menu from './Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';

const Navigation = () => {
	const [isOn, setisOn] = useState(false);
	const userPhotoUrl = useSelector(
		(state) => state.users.currentUserInfo.userPhotoUrl
	);
	const { pathname } = useLocation();
	const toggle = (event) => {
		setisOn(!isOn);
	};

	return (
		<>
			<div className="nav">
				<div className="nav_inner">
					<div className="logo">
						<Link to="/">Racstagram</Link>
					</div>
					<ul className="items">
						<li className="item">
							<Link to="/">
								{pathname === '/' ? (
									<HomeIcon className="icon_home" />
								) : (
									<HomeOutlinedIcon className="icon_home" />
								)}
							</Link>
						</li>
						<li className="item">
							<Link to="/write">
								{pathname === '/write' ? (
									<AddBoxIcon className="icon_write" />
								) : (
									<AddBoxOutlinedIcon className="icon_write" />
								)}
							</Link>
						</li>
						<li className="item">
							{userPhotoUrl && (
								<img
									src={userPhotoUrl}
									onClick={toggle}
									alt="user_image"
									className="nav_profile_image"
									style={
										pathname === '/profile' || isOn
											? { border: '' }
											: { border: 'none' }
									}
								/>
							)}
							<Menu toggle={toggle} isOn={isOn} location={'nav_menu_location'}>
								<Link to="/profile" className="menu_item">
									<AccountCircleOutlined />
									프로필
								</Link>
								<div className="menu_item">
									<LockOutlined />
									<SignOutContainer />
								</div>
								<div className="menu_item" onClick={toggle}>
									<div className="last_item_text">나가기</div>
								</div>
							</Menu>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default React.memo(Navigation);
