const Router = require('koa-router');

// 引入中间件
const { userValidator, verifyUser } = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller');

const router = new Router({
  // 路由前缀
  prefix: '/users'
});

// 注册接口
router.post('/register', userValidator, verifyUser, register);

// 登录接口
router.post('/login', login);

module.exports = router;