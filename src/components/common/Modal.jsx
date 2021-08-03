import { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ children, toggle, isOn, rowNum }) => {
	const [hasMounted, setHasMounted] = useState(false);
	const set = { transform: `translate(-200px ,${-(48 * rowNum) / 2}px)` };
	useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return <></>;
	}
	const modal = document.querySelector('.modal_root');
	return ReactDOM.createPortal(
		isOn ? (
			<div className="modal">
				<div className="modal_background" onClick={toggle}></div>
				<div className="modal_container" style={set}>
					{children}
				</div>
			</div>
		) : (
			<></>
		),
		modal
	);
};

export default Modal;

/* 
Modal 컴포넌트로 표현할 컴포넌트를 감싸서 children으로 대입
isOn에 보일지 안보일지의 값을 전달해서 제어 함
children은 item 클래스 이름으로 항목을 설정
*/
