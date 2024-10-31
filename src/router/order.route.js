const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/order.middleware");

const { create } = require("../controller/order.controller");

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

module.exports = router;
