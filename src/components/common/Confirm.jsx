import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Confirm.scss';

const Confirm = ({ children, isOn, toggle, message }) => {
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
