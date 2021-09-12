import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import './ShowError.scss';

// Auth 전용 Error 표시 Component
const ShowError = () => {
	// redux state (firebase 로그인 error 상태를 받아옴)
	const errorSelector = useSelector((state) => state.auth.errorSelector);

	// redux state로 불러온 error code를 지정한 message로 변환
	const check = () => {
		if (
			errorSelector === 'auth/user-not-found' ||
			errorSelector === 'auth/wrong-password'
		) {
			return '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.';
		} else if (errorSelector === 'auth/email-already-in-use') {
			return '이미 가입된 이메일 입니다.';
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
};

export default ShowError;
