import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ children, isOn }) => {
	const modal = document.querySelector('.modal_location');
	return ReactDOM.createPortal(
		isOn ? (
			<div className="modal">
				<div className="modal_container">{children}</div>
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
