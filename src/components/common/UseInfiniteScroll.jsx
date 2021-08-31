import { debounce } from 'lodash';
import React, { useRef, useEffect, useMemo } from 'react';

const UseInfiniteScroll = ({ execute }) => {
	const debounceExecute = useMemo(() => debounce(execute, 300), [execute]);

	// Target
	const lastElRef = useRef(null);

	// observer 식별자 (useEffect에서 사용되기 때문에 useRef로 변수 관리 함)
	const observer = useRef(null);

	useEffect(() => {
		// 과거 Observer 존재 확인 후 제거
		if (observer.current) {
			observer.current.disconnect();
			/*
      최초에 만들어지고, 나서 disconnect 하지 않고 새로 지정한다고 해도
      가비지 컬렉터가 그전에 있던것을 지우지 않음 
      (execute 함수가 계속해서 변하는 것을 반영하기 위해 제거하고 새로 다시 지정하는 로직으로 구현 함)
      */
		}

		// Observer 생성
		observer.current = new IntersectionObserver(
			([{ isIntersecting }]) => {
				if (isIntersecting) {
					debounceExecute();
				}
			},
			{ threshold: 0.5 }
		);

		// Observer On
		observer.current.observe(lastElRef.current);
	}, [debounceExecute]);

	useEffect(() => {
		// Observer Off
		return () => {
			observer.current.disconnect();
		};
	}, []);

	return <div ref={lastElRef} style={{ height: '20px' }}></div>;
};

export default UseInfiniteScroll;
