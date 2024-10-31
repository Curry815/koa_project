const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/addr.middleware");

const { create, findAll, update } = require("../controller/addr.controller");

const router = new Router({
  prefix: "/address",
});

// 添加地址接口
router.post(
  "/",
  auth,
  validator({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  create
);

// 获取地址列表接口
router.get("/", auth, findAll);

// 更新地址接口
router.put(
  "/:id",
  auth,
  validator({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  update
);

module.exports = router;
