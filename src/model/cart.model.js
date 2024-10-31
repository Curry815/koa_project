// 1.导入sequelize
const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const Goods = require("./goods.model");

// 2.定义模型
const Cart = seq.define("zd_carts", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品id",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});

// 3.同步数据库
// Cart.sync({ force: true });

// 5.关联商品表
Cart.belongsTo(Goods, {
  foreignKey: "goods_id",
  as: "goods_info",
});

// 4.导出模型
module.exports = Cart;
