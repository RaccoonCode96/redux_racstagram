const SignInForm = ({ onChange, inputs, onSubmit }) => {
	const { email, password } = inputs;

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
				<input className="auth_btn" type="submit" value={'Sign In'} />
			</form>
		</>
	);
};

export default SignInForm;
