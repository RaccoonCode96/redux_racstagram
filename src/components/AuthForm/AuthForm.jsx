import { Button, CircularProgress, TextField } from '@material-ui/core';
import './AuthForm.scss';
import {
	checkEmail,
	checkPassword,
	useCheckDisplayName,
} from '../../hooks/useChecks';

const AuthForm = ({
	onChange,
	inputs,
	onSubmit,
	newAccount,
	emailSignIn,
	emailSignUp,
	socialSignIn,
}) => {
	const { email, password, displayName } = inputs;

	// 이름 중복 검사에 따른 안내 color, message, code Ref 반환
	const checkDisplayName = useCheckDisplayName(null, displayName);

	// submit button 비활성화가 필요한 경우 true 반환
	const checkDisable = () => {
		if (newAccount) {
			return !(
				checkDisplayName.code === 'success' &&
				checkEmail(email) &&
				checkPassword(password)
			);
		} else {
			return !(checkEmail(email) && checkPassword(password));
		}
	};

	return (
		<form onSubmit={onSubmit} className="auth_form">
			<TextField
				variant="outlined"
				name="email"
				type="email"
				value={email}
				onChange={onChange}
				className="input"
				label="Email"
				size="small"
				placeholder="이메일 형식"
			/>
			<TextField
				className="input"
				variant="outlined"
				name="password"
				type="password"
				label="Password"
				size="small"
				placeholder="숫자, 영어 포함 8글자 이상(특수 문자X)"
				value={password}
				onChange={onChange}
			/>
			{newAccount ? (
				<>
					<TextField
						className="displayName_input"
						variant="outlined"
						name="displayName"
						label="User Name"
						type="text"
						size="small"
						value={displayName}
						onChange={onChange}
						helperText={checkDisplayName.helperTextMessage}
						InputProps={{
							className: checkDisplayName.input,
						}}
						FormHelperTextProps={{
							className: checkDisplayName.helperText,
						}}
					/>
				</>
			) : (
				<></>
			)}
			{emailSignIn || emailSignUp || socialSignIn ? (
				<CircularProgress />
			) : (
				<Button
					variant="contained"
					color="primary"
					className="auth_btn"
					type="submit"
					disableElevation
					disabled={checkDisable()}
				>
					{newAccount ? '가입하기' : '로그인'}
				</Button>
			)}
		</form>
	);
};

export default AuthForm;
