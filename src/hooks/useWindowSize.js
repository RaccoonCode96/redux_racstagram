import { useState, useEffect } from 'react';

// 브라우저 창 크기가 변하는 경우 크기 값을 반환하는 hook
const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return windowSize;
};

export default useWindowSize;
