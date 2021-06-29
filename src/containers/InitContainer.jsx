import Init from '../components/Init';
import { useSelector } from 'react-redux';

const InitContainer = () => {
	const init = useSelector((state) => state.init);

	return <Init init={init} />;
};

export default InitContainer;
