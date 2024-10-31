const { createOrUpdate } = require("../service/cart.service");

class cartController {
  async add(ctx) {
    // 将商品添加到购物车
    ctx.body = "添加购物车成功";
    // 1.解析user_id和goods_id
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    // 2.操作数据库
    const res = await createOrUpdate(user_id, goods_id);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "添加购物车成功",
      result: res,
    };
  }
}

module.exports = new cartController();
