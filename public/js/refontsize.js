;(function () {
	var docWidth = document.documentElement.clientWidth || document.body.clientWidth
	var docEle = document.getElementsByTagName('html')[0]
	docEle.style.fontSize = docWidth / 10 + 'px';
})();