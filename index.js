const App = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const PORT = process.env.PORT || 5000

const shift = require('tw-shift-schedule')

let app = new App()
let router = new Router()

router.post('/validate', async function (ctx) {
  if (!ctx.request.body.schedule) {
    ctx.response.status = 406
    ctx.body = 'Invalid schedule data'
    return
  }

  let schedule = shift.Schedule.fromTime(ctx.request.body.schedule)

  let result = shift.validate(schedule)
  ctx.body = JSON.stringify(result)
})

router.post('/validate_two_week', async function (ctx) {
  if (!ctx.request.body.schedule) {
    ctx.response.status = 406
    ctx.body = 'Invalid schedule data'
    return
  }

  let schedule = shift.Schedule.fromTime(ctx.request.body.schedule)

  let result = shift.validate(schedule, {transformed: shift.validate.two_week})
  ctx.body = JSON.stringify(result)
})

router.post('/validate_four_week', async function (ctx) {
  if (!ctx.request.body.schedule) {
    ctx.response.status = 406
    ctx.body = 'Invalid schedule data'
    return
  }

  let schedule = shift.Schedule.fromTime(ctx.request.body.schedule)

  let result = shift.validate(schedule, {transformed: shift.validate.four_week})
  ctx.body = JSON.stringify(result)
})

router.post('/validate_eight_week', async function (ctx) {
  if (!ctx.request.body.schedule) {
    ctx.response.status = 406
    ctx.body = 'Invalid schedule data'
    return
  }

  let schedule = shift.Schedule.fromTime(ctx.request.body.schedule)

  let result = shift.validate(schedule, {transformed: shift.validate.eight_week})
  ctx.body = JSON.stringify(result)
})

router.post('/overwork', async function (ctx) {
  if (!ctx.request.body.schedule) {
    ctx.response.status = 406
    ctx.body = 'Invalid schedule data'
    return
  }

  let schedule = shift.Schedule.fromTime(ctx.request.body.schedule)

  let result = shift.overwork.check(schedule)
  ctx.body = JSON.stringify(result)
})

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
