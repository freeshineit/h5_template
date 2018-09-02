import './index.scss'
import images from '../../assets/images/a.png'

const $ = window.$

class About  {
	say () {
		console.log('hahaha')
		console.log(images)
	}
}

let a = new About()

a.say()