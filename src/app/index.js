const path = require("path");

const Koa = require("koa");
const { koaBody } = require("koa-body");
const KoaStatic = require("koa-static");
const parameter = require("koa-parameter");

const errorHandle = require("./errHandle");

const router = require("../router/index");

const app = new Koa();

// 注册中间件
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 使用path模块获取绝对路径
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(KoaStatic(path.join(__dirname, "../upload"))); // 静态资源
app.use(parameter(app)); // 参数校验
app.use(router.routes()).use(router.allowedMethods()); // 路由

// 统一错误处理
app.on("error", errorHandle);

module.exports = app;
