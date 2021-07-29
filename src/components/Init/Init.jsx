import AppRouter from '../Router';
import Load from '../common/Load';
import { useEffect } from 'react';

const Init = ({ isInit, isSignInOut }) => {
	useEffect(() => {
		isSignInOut();
	}, [isSignInOut]);
	return <>{isInit ? <AppRouter /> : <Load />}</>;
};

export default Init;
