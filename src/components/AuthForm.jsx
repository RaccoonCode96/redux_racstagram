const AuthForm = ({ onChange, inputs, onSubmit, newAccount, check, exist }) => {
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
					<>
						<input
							className="auth_input"
							name="displayName"
							type="text"
							placeholder="Nickname"
							required
							value={displayName}
							onChange={onChange}
						/>
						<span>
							{!exist[1] || displayName !== exist[1]
								? '중복 확인이 필요합니다.'
								: exist[0]
								? `${exist[1]}는 이미 존재하는 이름 입니다!`
								: 'OK!'}
						</span>
						<button
							onClick={(event) => {
								event.preventDefault();
								check(displayName);
							}}
						>
							닉네임 중복 검사
						</button>
					</>
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
