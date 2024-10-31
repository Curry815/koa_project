const { createAddr } = require("../service/addr.service");

class AddrController {
  async create(ctx) {
    // 解析user_id, consignee, phone, address
    const user_id = ctx.state.user.id;
    const { consignee, phone, address } = ctx.request.body;

    // 将地址添加到数据库
    const res = await createAddr({
      user_id,
      consignee,
      phone,
      address,
    });

    // 返回结果
    ctx.body = {
      code: 0,
      message: "添加地址成功",
      result: res,
    };
  }
}

module.exports = new AddrController();
