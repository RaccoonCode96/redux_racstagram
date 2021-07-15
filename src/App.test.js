import { storageService } from './fBase';

it('initCurrentUser TEST', () => {
	const fuc = async () => {
		// 기존 url 삭제는 보류
		const google = `https://lh3.googleusercontent.com/a-/AOh14Ghq3yWQfdPRPStzGKmR8nJItkX9OxmVuAye2YRb6Q=s96-c`;
		const storage = `https://firebasestorage.googleapis.com/v0/b/rwitter-914af.appspot.com/o/1BvfQdsdq2ZOVHjwFh4kzpaZjnW2%2F4f840372-aaad-47ea-8850-f437c41e8f4c?alt=media&token=22f0399c-3b70-4193-95d3-08166af51f9d`;

		const prevImageUrl = storage;

		let errorHandler = 'complete';
		try {
			if (prevImageUrl) {
				await storageService.refFromURL(storage).delete();
			}
		} catch ({ message, code }) {
			if (code === 'storage/invalid-argument') {
				errorHandler = 'None';
			} else {
				errorHandler = { message, code };
			}
		}
		return errorHandler;
	};
	console.log(fuc());
});
