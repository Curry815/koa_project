const Router = require("koa-router");

// 引入中间件
const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");
const {
  register,
  login,
  changePassword,
} = require("../controller/user.controller");

const router = new Router({
  // 路由前缀
  prefix: "/users",
});

// 注册接口
router.post("/register", userValidator, verifyUser, crpytPassword, register);

// 登录接口
router.post("/login", userValidator, verifyLogin, login);

// 修改密码接口
router.patch("/", auth, crpytPassword, changePassword);

module.exports = router;
