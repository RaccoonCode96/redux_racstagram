import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import './ShowError.scss';

const ShowError = () => {
	const errorSelector = useSelector((state) => state.auth.errorSelector);
	const check = () => {
		if (
			errorSelector === 'auth/user-not-found' ||
			errorSelector === 'auth/wrong-password'
		) {
			return '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.';
		} else {
			return errorSelector;
		}
	};
	return (
		<div className="show_error">
			{errorSelector ? (
				<Alert severity="warning" className="message">
					{check()}
				</Alert>
			) : (
				<></>
			)}
		</div>
	);
	// <h4 className="auth_error">{errorSelector}</h4>;
};

export default ShowError;
