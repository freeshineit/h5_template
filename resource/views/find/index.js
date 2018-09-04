import './index.scss'

const $ = window.$

class Home  {

	constructor(target) {
		this.data = null;
		this.node = $(target);
		this.getData();
	}

	getData() {

		$.ajax({
			url: '/sf/vsearch/image/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&fromsf=1&word=%E7%BE%8E%E5%A5%B3&pn=60&rn=30&gsm=3c',
			method: 'GET',
			success: (res) => {
				this.data = JSON.parse(res).data
				this.renderHtml(this.data);
			}
		})
	}

	renderHtml(data) {
		let node = this.node;

		let html = '';

		for(let i =0 ; i < data.length; i++ ){
			html += `
				<li class="home-list-item" >
					<img src=${data[i].thumbnail_url}/>
					<p class='title'>${data[i].title}</p>
				</li>
			`
		}

		node.append(html);
	}
}

new Home('.home-list');

