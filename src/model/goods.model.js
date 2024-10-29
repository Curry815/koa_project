const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建模型
const Goods = seq.define(
  "zd_goods",
  {
    // ID会自动创建
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "商品价格",
    },
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品库存",
    },
    goods_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片的url",
    },
  },
  {
    timestamps: false, // 不自动添加创建和修改时间的字段
  }
);

// 强制同步数据库(创建数据表)
Goods.sync({ force: true });

module.exports = Goods;
