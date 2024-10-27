/**
 * 所有数据库的操作都在 Service 层完成, Service 调用 Model 完成数据库操作
 */
const User = require('../model/user.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    
    return res.dataValues
  }
}

module.exports = new UserService();