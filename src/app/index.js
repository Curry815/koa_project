const Koa = require('koa');
const { koaBody } = require('koa-body');

const userRouter = require('../router/user.route');

const app = new Koa();

// 注册中间件
app.use(koaBody());
app.use(userRouter.routes());

module.exports = app; 