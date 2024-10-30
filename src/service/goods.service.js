const Goods = require("../model/goods.model");

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }

  async updateGoods(id, goods) {
    const res = await Goods.update(goods, {
      where: {
        id,
      },
    });
    return res[0] > 0 ? true : false;
  }

  async removeGoods(id) {
    const res = await Goods.destroy({
      where: {
        id,
      },
    });
    return res > 0 ? true : false;
  }

  async restoreGoods(id) {
    const res = await Goods.restore({
      where: {
        id,
      },
    });
    return res > 0 ? true : false;
  }

  async findGoods(pageNum, pageSize) {
    // // 1.获取总数
    // const count = await Goods.count();
    // // 2.获取分布的具体数据
    // const offset = (pageNum - 1) * pageSize; // 偏移量
    // const rows = await Goods.findAll({
    //   offset,
    //   limit: pageSize * 1,
    // });

    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: pageSize * 1,
    });

    return {
      pageNum, // 当前页码
      pageSize, // 每页显示条数
      total: count, // 总条数
      list: rows, // 分页数据
    };
  }
}

module.exports = new GoodsService();
