export const getRandomAmount = function (min, max) {
	return Math.random() * (max - min) + min;
};

export const getShuffledArray = function (inputArray) {
	// https://stackoverflow.com/a/2450976/5125537
	const outputArray = [...inputArray];
	let { length: counter } = outputArray;
	let temp;
	let index;

	while (counter > 0) {
		index = Math.floor(Math.random() * counter);
		counter -= 1;
		temp = outputArray[counter];
		outputArray[counter] = outputArray[index];
		outputArray[index] = temp;
	}

	return outputArray;
};