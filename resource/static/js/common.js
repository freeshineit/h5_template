(function () {
	// header 

	// footer 


	(function() {
			// footer_nav
		var footerNavList = $('.footer_nav .nav_list .item');

		if (footerNavList && _global.footerNav > -1) {
			$($(footerNavList)[_global.footerNav]).addClass('selected')
		}

		footerNavList.on('click', function (e) {
			$(this).addClass('selected').siblings().removeClass('selected')
		})
	})();

})();