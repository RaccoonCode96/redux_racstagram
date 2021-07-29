import { useSelector } from 'react-redux';

const ShowError = () => {
	const errorSelector = useSelector((state) => state.auth.errorSelector);

	return <h4 className="auth_error">{errorSelector}</h4>;
};

export default ShowError;
