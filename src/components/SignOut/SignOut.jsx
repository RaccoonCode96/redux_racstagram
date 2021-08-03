import { useState } from 'react';
import Confirm from '../common/Confirm';

const SignOut = ({ onSignOutClick }) => {
	const [isOn, setIsOn] = useState(false);
	const toggle = () => {
		setIsOn(!isOn);
	};
	return (
		<>
			<span className="profile_btn" onClick={toggle}>
				로그아웃
			</span>
			<Confirm
				isOn={isOn}
				toggle={toggle}
				message="정말로 로그아웃 하시겠습니까?"
			>
				<button className="confirm_item" onClick={onSignOutClick}>
					예
				</button>
				<button className="confirm_item" onClick={toggle}>
					아니오
				</button>
			</Confirm>
		</>
	);
};

export default SignOut;
