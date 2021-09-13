import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrevScrollY } from '../redux/modules/post';

// unmout 되기 전의 스크롤 위치 기억을 요청하는 hook

const useScroll = () => {
	const dispatch = useDispatch();
	const prevScrollY = useSelector((state) => state.post.prevScrollY);
	useLayoutEffect(() => {
		if (prevScrollY) {
			window.scrollTo(0, prevScrollY);
		}
		return () => {
			dispatch(setPrevScrollY(window.scrollY));
		};
	}, [dispatch, prevScrollY]);
};

export default useScroll;
