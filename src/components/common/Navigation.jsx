import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
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
							<Link to="/profile">
								<FontAwesomeIcon
									className="nav_NoPortrait"
									icon={faUserCircle}
									size="2x"
								/>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navigation;
