const useRandom = async (count, range) => {
	const randomSet = new Set();
	while (randomSet.size < count) {
		await randomSet.add(Math.floor(Math.random() * range));
	}
	return [...randomSet];
};

export default useRandom;
