import { useSelector } from 'react-redux';

const SignInError = () => {
	const signInError = useSelector((state) => state.auth.errorSelector);
	return <h4 className="auth_error">{signInError}</h4>;
};

export default SignInError;
