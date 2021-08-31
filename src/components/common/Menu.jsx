import './Menu.scss';

// menu 창 UI Component
const Menu = ({ children, toggle, isOn, location }) => {
	return isOn ? (
		<div className="menu">
			<div className="menu_background" onClick={toggle}></div>
			<div className={`menu_container ${location}`}>{children}</div>
		</div>
	) : (
		<></>
	);
};

export default Menu;

/* 
children : 항목 역할로 className으로 menu_item을 가지는 요소들
isOn : Menu를 보여줄지 말지 결정해주는 true 또는 false를 가지는 값 
toggle : isOn의 true 또는 false 값을 변경시키는 함수
location : menu_container 클래스 이름을 가지는 요소에 추가하는 
container 위치 top, left, right, bottom 기준을 가지는 className을 넣어줌
*/
