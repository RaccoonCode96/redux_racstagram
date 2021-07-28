const resize = (img, maxSize) => {
	let canvas = document.createElement('canvas'),
		max_size = maxSize,
		width = img.width,
		height = img.height;
	if (width > height) {
		if (width > max_size) {
			height *= max_size / width;
			width = max_size;
		}
	} else {
		if (height > max_size) {
			width *= max_size / height;
			height = max_size;
		}
	}
	canvas.width = width;
	canvas.height = height;
	canvas.getContext('2d').drawImage(img, 0, 0, width, height);
	const dataUrl = canvas.toDataURL('image/jpeg');
	return dataUrl;
};

export default resize;
