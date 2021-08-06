import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import './ShowError.scss';

const ShowError = () => {
	const errorSelector = useSelector((state) => state.auth.errorSelector);
	return (
		<div className="show_error">
			{errorSelector ? (
				<Alert severity="warning" className="message">
					{errorSelector === 'auth/user-not-found'
						? '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'
						: errorSelector}
				</Alert>
			) : (
				<></>
			)}
		</div>
	);
	// <h4 className="auth_error">{errorSelector}</h4>;
};

export default ShowError;
