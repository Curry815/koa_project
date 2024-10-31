const { Op } = require("sequelize");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");

class CartService {
  async createOrUpdate(user_id, goods_id) {
    // 根据user_id和goods_id查询购物车
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });

    if (res) {
      // 已经存在一条记录，将number + 1
      await res.increment("number");
      return await res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }

  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Cart.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  async updateCarts(params) {
    const { id, number, selected } = params;

    const res = await Cart.findByPk(id);

    if (!res) return "";

    number !== undefined ? (res.number = number) : ""; // 如果number存在，则更新number, 否则不更新
    selected !== undefined ? (res.selected = selected) : "";

    return await res.save(); // 保存更新后的数据
  }
}

module.exports = new CartService();
