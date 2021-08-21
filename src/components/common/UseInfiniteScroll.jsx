// import { CircularProgress } from '@material-ui/core';
import { debounce } from 'lodash';
import React, { useRef, useEffect, useMemo } from 'react';

const UseInfiniteScroll = ({ execute }) => {
	const debounceExecute = useMemo(() => debounce(execute, 300), [execute]);
	const lastElRef = useRef(null);
	const observer = useRef(null);

	useEffect(() => {
		// 최초에 만들어지고, 나서 disconnect 하지 않고 새로 지정한다고 해도 가비지 컬렉터가 그전에 있던것을 지우지 못하는 듯함
		if (observer.current) {
			observer.current.disconnect();
			// console.log('observe: init');
		}

		observer.current = new IntersectionObserver(
			([{ isIntersecting }]) => {
				if (isIntersecting) {
					// execute();
					// console.log('function run');
					debounceExecute();
				}
			},
			{ threshold: 0.5 }
		);

		observer.current.observe(lastElRef.current);
		// console.log('observe : is watching');
	}, [debounceExecute]);

	useEffect(() => {
		return () => {
			observer.current.disconnect();
			// console.log('observe : disconnected');
		};
	}, []);

	return <div ref={lastElRef} style={{ height: '20px' }}></div>;
};

export default UseInfiniteScroll;
