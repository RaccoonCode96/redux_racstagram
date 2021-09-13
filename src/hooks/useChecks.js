import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

// material UI textField 색상 제어를 위한 객체 반환기
const useStyles = makeStyles({
	input: {
		'& input + fieldset': {
			borderColor: (props) => props.color,
		},
		'& input:valid:focus + fieldset': {
			borderColor: (props) => props.color,
		},
		'& input:valid:hover + fieldset': {
			borderColor: (props) => props.color,
		},
	},
	helperText: {
		color: (props) => props.color,
	},
});

// 패스워드 validation 확인
export const checkPassword = (password) => {
	let res = false;

	if (!password) {
		res = false;
	} else {
		const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
		check ? (res = true) : (res = false);
	}

	return res;
};

// Email validation 확인
export const checkEmail = (email) => {
	let res = false;

	if (!email) {
		res = false;
	} else {
		const check =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(
				email
			);
		check ? (res = true) : (res = false);
	}

	return res;
};

// website 형식 확인 및 결과 메세지, 색상 반환
export const useCheckWebsite = (website) => {
	let color = '';
	let message = '';
	let code = '';
	const res =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
			website
		);
	if (!website) {
		color = 'rgba(0, 0, 0, 0.3)';
		message = '';
		code = 'empty';
	} else {
		if (res) {
			color = 'green';
			message = 'URL 형식에 맞습니다.';
			code = 'success';
		} else {
			color = 'red';
			message =
				'URL 형식에 맞지 않습니다. (http:// 또는 https://를 포함시켜주세요.)';
			code = 'error';
		}
	}

	return {
		input: useStyles({ color }).input,
		helperText: useStyles({ color }).helperText,
		helperTextMessage: message,
		code,
	};
};

// 이름 중복 확인 및 결과 메세지 반환
export const useCheckDisplayName = (prevDisplayName, displayName) => {
	const exist = useSelector((state) => state.users.checkDisplayName.exist);

	let code = '';
	let color = '';
	let message = '';

	if (prevDisplayName === displayName) {
		code = 'default';
	} else {
		if (!displayName) {
			code = 'empty';
		} else if (!exist[1] || displayName !== exist[1]) {
			//이름이 확인된 적이 없는 경우 또는 이전에 확인된 이름과 input이 같지 않은 경우
			code = 'warning';
		} else {
			// 확인된 이름이 존재하는 경우
			if (exist[0]) {
				code = 'error';
			} else {
				// 확인된 이름이 존재하지 않는 경우
				code = 'success';
			}
		}
	}

	switch (code) {
		case 'empty':
			color = 'orange';
			message = '이름을 입력해 주세요';
			break;
		case 'warning':
			color = 'orange';
			message = '중복 확인이 필요합니다.';
			break;
		case 'success':
			color = 'green';
			message = `${exist[1]}는 사용가능 합니다.`;
			break;
		case 'error':
			color = 'red';
			message = `${exist[1]}는 이미 존재하는 이름입니다.`;
			break;
		default:
			color = 'rgba(0, 0, 0, 0.3)';
			message = ``;
	}
	return {
		input: useStyles({ color }).input,
		helperText: useStyles({ color }).helperText,
		helperTextMessage: message,
		code,
	};
};
