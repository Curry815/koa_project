// 1. 导入koa-router
const Router = require("koa-router");

// 中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");

// 控制器
const {
  add,
  findAll,
  update,
  remove,
  selectAll,
  // unSelectAll,
} = require("../controller/carts.controller");

// 2. 实例化router对象
const router = new Router({
  prefix: "/carts",
});

// 3.编写路由规则
// 3.1 添加到购物车接口：登录，格式
router.post("/", auth, validator({ goods_id: "number" }), add);

// 3.2 获取购物车列表接口：登录
router.get("/", auth, findAll);

// 3.3 更新购物车
router.patch(
  "/:id",
  auth,
  validator({
    number: {
      type: "number",
      required: false,
    },
    selected: {
      type: "boolean",
      required: false,
    },
  }),
  update
);

// 3.4 删除购物车接口
router.delete("/", auth, validator({ ids: "array" }), remove);

// 3.5 全选
// router.post("/selectAll", auth, selectAll);
// // 3.6 全不选
// router.post("/unSelectAll", auth, unSelectAll);

// 全选和全不选合并， 通过传递一个is_All参数判断
router.post("/selectAll", auth, selectAll);

// 4.导出router对象
module.exports = router;
