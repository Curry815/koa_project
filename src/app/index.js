const Koa = require("koa");
const { koaBody } = require("koa-body");

const errorHandle = require("./errHandle");

const router = require("../router/index");

const app = new Koa();

// 注册中间件
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

// 统一错误处理
app.on("error", errorHandle);

module.exports = app;
