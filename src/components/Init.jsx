import AppRouter from './Router';
import Load from './Load';

const Init = ({ init }) => {
	return <>{init ? <AppRouter /> : <Load />}</>;
};

export default Init;
// 변경 테스트
