import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Init from '../components/Init';
import { setIsinitTrue } from '../redux/modules/init';

const InitContainer = () => {
	const isInit = useSelector((state) => state.init.isInit);
	const dispatch = useDispatch();

	const setIsinit = useCallback(() => {
		dispatch(setIsinitTrue());
	}, [dispatch]);
	return <Init setIsinit={setIsinit} isInit={isInit} />;
};

export default InitContainer;
