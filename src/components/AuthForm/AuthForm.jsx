import { Button, CircularProgress, TextField } from '@material-ui/core';
import './AuthForm.scss';
import Alert from '@material-ui/lab/Alert';

const AuthForm = ({
	onChange,
	inputs,
	onSubmit,
	newAccount,
	check,
	exist,
	emailSignIn,
	emailSignUp,
	socialSignIn,
	checkDisplayName,
}) => {
	const { email, password, displayName } = inputs;

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
			/>
			<TextField
				className="input"
				variant="outlined"
				name="password"
				type="password"
				label="Password"
				size="small"
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
					/>
					{checkDisplayName ? (
						<CircularProgress size={48} className="loading" />
					) : !exist[1] || displayName !== exist[1] ? (
						<Alert className="check_message" severity="warning">
							중복 확인이 필요합니다.
						</Alert>
					) : exist[0] ? (
						<Alert className="check_message" severity="error">
							{exist[1]}는 이미 존재하는 이름 입니다!
						</Alert>
					) : (
						<Alert className="check_message" severity="success">
							OK! : {exist[1]}는 사용해도 좋습니다.
						</Alert>
					)}
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
				>
					{newAccount ? '가입하기' : '로그인'}
				</Button>
			)}
		</form>
	);
};

export default AuthForm;
