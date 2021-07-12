import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<>
			<div className="head_container">
				<nav className="nav_container">
					<div className="head_logo">Racstagram</div>
					<ul className="nav_items">
						<li className="nav_item">
							<Link to="/">
								<FontAwesomeIcon
									className="icon_home"
									icon={faHome}
									size={'2x'}
								/>
							</Link>
						</li>
						<li className="nav_item">
							<Link to="/write">
								<FontAwesomeIcon
									className="nav_NoPortrait"
									icon={faPlusSquare}
									size="2x"
								/>
							</Link>
						</li>
						<li className="nav_item">
							<Link to="/profile">
								<FontAwesomeIcon
									className="nav_NoPortrait"
									icon={faUserCircle}
									size="2x"
								/>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="nav_block"></div>
		</>
	);
};

export default Navigation;
