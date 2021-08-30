import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Confirm.scss';

// 확인창 UI Component
const Confirm = ({ children, isOn, toggle, message }) => {
	// monut 되고 나서 document.querySelector 사용 가능하기 때문에 mount 되고 나서 createPortal 사용
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return <></>;
	}

	const modal = document.querySelector('.modal_root');

	return ReactDOM.createPortal(
		isOn ? (
			<div className="confirm">
				<div className="confirm_background" onClick={toggle}></div>
				<div className="confirm_container">
					<Alert severity="warning" className="message">
						{message}
					</Alert>
					<div className="confirm_items">{children}</div>
				</div>
			</div>
		) : (
			<></>
		),
		modal
	);
};

export default Confirm;
