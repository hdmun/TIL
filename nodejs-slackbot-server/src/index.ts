import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import controller from './controller'


const app = new Koa()
const router = new Router()
const port: number = 3000;

app.use(bodyParser())
router.use(controller.routes())
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, ()=> {
    console.log(`Koa server is listening on port ${port}`)
})
