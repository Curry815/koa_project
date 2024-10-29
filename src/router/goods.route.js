const Router = require("koa-router");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const { upload, create, update } = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

// 商品图片上传接口
// router.post("/upload", auth, hasAdminPermission, upload);
router.post("/upload", upload);

// 发布商品接口
router.post("/", auth, hasAdminPermission, validator, create);

// 修改商品接口
router.put("/:id", auth, hasAdminPermission, validator, update);

module.exports = router;
