const fs = require('fs')
// 第一阶段 callback
function readFile(cd) {
	fs.readFile('./package.json', (err, data) => {
		if(err) return cb(err)
		cd(null, data)
	})
}

readFile((err, data) => {
	if(!err) {
		data = JSON.parse(data)
		console.log(data.name)
	}
})
// 第二阶段 Promise
function readFileAsync(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, data) => {
			if(err) reject(err)
			else resolve(data)
		})
	})
}

readFileAsync('./package.json')
	.then(data => {
		data = JSON.parse(data)
		console.log(data.name)
	})
	.catch(err => {
		console.log(err)
	})

	// 第三个阶段 co + Generator Function + Promise
	const co = require('co')
	const util = require('util')

	co(function *() {
		let data = yield util.promisify(fs.readFile)('./package.json')
		data = JSON.parse(data)
		console.log(data.name)
	})

	// 第四个阶段 async 统一world
	const readAsync = util.promisify(fs.readFile)
	async function init() {
		let data = await readAsync('./package.json')
		console.log(JSON.parse(data).name)
	}
	init()