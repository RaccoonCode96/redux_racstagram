// 겹치지 않는 랜덤 숫자 배열 생성기

const useRandom = (count, range, except) => {
	if (count > range - 1 || except === undefined) {
		return [];
	}
	const randomSet = new Set();
	while (randomSet.size < count) {
		const temp = Math.floor(Math.random() * range) + 1;
		if (temp === except) {
			continue;
		}
		randomSet.add(temp);
	}
	return [...randomSet];
};

export default useRandom;

/* 
count : 뽑을 개수
range : 정수 숫자 범위
except : 뽑는 숫자중에 제외할 정수
return : 일정 범위(0이상 ~ range 이하) 숫자에서 일정한 개수의 랜덤 숫자가 들어간 배열을 반환 (except 고려)
*/
