const Modal = ({ children, isOn }) => {
	return isOn ? <>{children}</> : <></>;
};

export default Modal;

/* 
Modal 컴포넌트로 표현할 컴포넌트를 감싸서 children으로 대입
isOn에 보일지 안보일지의 값을 전달해서 제어 함
*/
