import AppRouter from './Router';
// import Load from './Load';
import { useEffect } from 'react';

const Init = ({ isInit, setIsinit }) => {
	useEffect(() => {
		setIsinit();
	}, [setIsinit]);
	return <>{isInit ? <AppRouter /> : <div>load</div>}</>;
};

export default Init;
