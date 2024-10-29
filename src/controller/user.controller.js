/**
 * 业务层 操作数据库
 * @description 用户模块
 */
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");
const {
  createUser,
  getUerInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");

class UserController {
  // 用户注册
  async register(ctx, next) {
    // 1.获取数据
    const { user_name, password } = ctx.request.body;
    try {
      // 2.操作数据库
      const res = await createUser(user_name, password);
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  // 用户登录
  async login(ctx, next) {
    const { user_name } = ctx.request.body;

    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const { password, ...res } = await getUerInfo({ user_name });

      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }

  // 用户修改密码
  async changePassword(ctx, next) {
    // 1.获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // 2.操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: "10007",
        message: "修改密码失败",
        result: "",
      };
    }
    // 3.返回结果
  }
}

module.exports = new UserController();
