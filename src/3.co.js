const co = require('co') // co不能yield Boolean String
const fetch = require('node-fetch')

co(function *() {
	const res  = yield fetch('https://api.douban.com/v2/movie/1291843')
	const movie = yield res.json()
	const summary = movie.summary
	console.log('summary', summary)
})