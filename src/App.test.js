import { storageService } from './fBase';

it('initCurrentUser TEST', () => {
	const fuc = () => {
		let check = false;
		try {
			const result = storageService
				.refFromURL(
					// 'https://firebasestorage.googleapis.com/v0/b/rwitter-914af.appspot.com/o/8t7webBbTRUgkePe6qONQlDCwvx2%2Ff741cb10-c3bc-4171-b25e-13dc937f21fc?alt=media&token=14417979-b316-4e3f-bfdf-0eb86bd34264'
					'https://lh3.googleusercontent.com/a-/AOh14Ghq3yWQfdPRPStzGKmR8nJItkX9OxmVuAye2YRb6Q=s96-c'
				)
				.delete();
			check = !!result;
		} catch ({ code }) {
			console.log(code);
			if (code === 'storage/invalid-argument') {
				check = false;
			}
		}
		console.log(check);
	};
	fuc();
});
