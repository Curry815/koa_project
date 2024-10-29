const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");

const { tokenExpiredError, invalidToken } = require("../constant/err.type");

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  const token = authorization.replace("Bearer ", "");

  try {
    // user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }

  await next();
};

module.exports = {
  auth,
};
