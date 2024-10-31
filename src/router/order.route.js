const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/order.middleware");

const { create, findAll } = require("../controller/order.controller");

const router = new Router({
  prefix: "/orders",
});

// 添加订单接口
router.post(
  "/",
  auth,
  validator({ address_id: "int", goods_info: "string", total: "string" }),
  create
);

// 获取订单列表接口
router.get("/", auth, findAll);

module.exports = router;