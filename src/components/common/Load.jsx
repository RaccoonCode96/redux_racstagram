import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Load.scss';

const Load = () => {
	return (
		<>
			<div className="load">
				<h2 className="title">Racstagram</h2>
				<div className="icon">
					<FontAwesomeIcon
						className={'fa-spin'}
						icon={faInstagram}
						size={'10x'}
					/>
				</div>
			</div>
		</>
	);
};

export default Load;
