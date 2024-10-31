const { createOrder } = require("../service/order.service");

class OrderController {
  async create(ctx) {
    const user_id = ctx.state.user.id;
    const { address_id, goods_info, total } = ctx.request.body;

    const order_number = "XZD" + Date.now();

    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });

    ctx.body = {
      code: 0,
      msg: "添加订单成功",
      data: res,
    };
  }
}

module.exports = new OrderController();
