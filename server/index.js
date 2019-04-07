const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
	ctx.body = 'adasf'
	await next()
})

app.use(async (ctx, next) => {
	ctx.body = ctx.body + '—adasf'
})
app.listen(3000)
