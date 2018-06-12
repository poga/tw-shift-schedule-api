const App = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const shift = require('tw-shift-schedule')

let app = new App()
let router = new Router()

router.post('/validate', async function (ctx) {
  if (!ctx.body.schedule) {
    ctx.response.status = 406
    ctx.body = 'Invalid schedule data'
  }

  let schedule = shift.Schedule.fromTime(ctx.request.body.schedule)

  let result = shift.validate(schedule)
  ctx.body = JSON.stringify(result)
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
