const Router = require("koa-router");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const {
  upload,
  create,
  update,
  remove,
  restore,
} = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

// 商品图片上传接口
router.post("/upload", auth, hasAdminPermission, upload);

// 发布商品接口
router.post("/", auth, hasAdminPermission, validator, create);

// 修改商品接口
router.put("/:id", auth, hasAdminPermission, validator, update);

// 商品下架接口 硬删除接口
// router.delete("/:id", auth, hasAdminPermission, remove);

// 商品下架接口 软删除接口
router.post("/:id/off", auth, hasAdminPermission, remove);

// 商品上架接口
router.post("/:id/on", auth, hasAdminPermission, restore);

module.exports = router;
