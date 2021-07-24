import { dbService } from './fBase';

it('initCurrentUser TEST', () => {
	const check = async (userName) => {
		const { docs } = await dbService
			.collection('users')
			.where('userDisplayName', '==', userName)
			.get();
		console.log(docs);
	};
	check('변경됨');
});
