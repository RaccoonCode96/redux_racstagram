const AuthForm = ({ onChange, inputs, onSubmit, newAccount }) => {
	const { email, password, displayName } = inputs;

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					className="auth_input"
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onChange}
				/>
				<input
					className="auth_input"
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
				/>
				{newAccount ? (
					<input
						className="auth_input"
						name="displayName"
						type="text"
						placeholder="Nickname"
						required
						value={displayName}
						onChange={onChange}
					/>
				) : (
					<></>
				)}
				<input
					className="auth_btn"
					type="submit"
					value={newAccount ? '가입하기' : '로그인'}
				/>
			</form>
		</>
	);
};

export default AuthForm;
