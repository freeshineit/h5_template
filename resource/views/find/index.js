import './index.scss'

const $ = window.$

class Find  {

	constructor(target) {
		this.data = null;
		this.node = $(target);
		this.getData();
	}

	getData() {

		$.ajax({
			url: '/api/v3/ranklist?num=10&strategy=weekly',
			method: 'GET',
			success: (res) => {
				this.renderHtml(res.itemList);
			}
		})
	}

	renderHtml(data) {
		let node = this.node;

		let html = '';

		for(let i =0 ; i < data.length; i++ ){
			if (data[i].type == 'video')
				html += `
					<li class="find-list-item" >
						<div class='item-content'>
							<img src=${data[i].data.cover.feed}/>
							<p class='title'>${data[i].data.title}</p>
							<p class='desc'>${data[i].data.description}</p>
						</div>
					</li>
				`
		}

		node.append(html);
	}
}

new Find('.find-list');

