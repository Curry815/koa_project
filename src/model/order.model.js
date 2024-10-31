const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Order = seq.define("zd_orders", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "收货地址id",
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "商品信息",
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "订单总金额",
  },
  order_number: {
    type: DataTypes.CHAR(16),
    allowNull: false,
    comment: "订单号",
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "订单状态(0:已下单, 1:已支付, 2:已发货, 3:已收货, 4:已取消)",
  },
});

Order.sync({ force: true });

module.exports = Order;
