import './index.scss'

const iconName = [
	'icon-delete',
	'icon-download',
	'icon-home',
	'icon-todown',
	'icon-qrcode',
	'icon-wangxin',
	'icon-address',
	'icon-arr-right',
	'icon-zan',
	'icon-close',
	'icon-finish',
	'icon-failure',
	'icon-arr-left',
	'icon-arr-bottom',
	'icon-arr-up',
]

class Icon {
	render () {
		const iconNode = $('.icon-list');
		let html = '';

		for (let i = 0; i < iconName.length; i ++) {
			html += `
				<li class='icon-item'><span class="icon ${iconName[i]}"></span></li>
			`
		}
		console.log(html)
		iconNode.append(html)	
	}
}

let icon = new Icon();

icon.render();
