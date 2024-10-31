const Address = require("../model/addr.model");

class AddrService {
  async createAddr(addr) {
    return await Address.create(addr);
  }

  async findAllAddr(user_id) {
    return await Address.findAll({
      attributes: ["id", "consignee", "phone", "address"],
      where: { user_id },
    });
  }

  async updateAddr(id, addr) {
    return await Address.update(addr, {
      where: { id },
    });
  }

  async removeAddr(id) {
    return await Address.destroy({
      where: { id },
    });
  }

  async setDefaultAddr(user_id, id) {
    // 先将当前用户的所有地址的is_default设置为false
    await Address.update({ is_default: false }, { where: { user_id } });
    // 再根据id将当前地址的is_default设置为true
    await Address.update({ is_default: true }, { where: { id: id } });
  }
}

module.exports = new AddrService();
