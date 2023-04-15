const { user } = require('../database/db');

module.exports = {
  async createUser(req) {
    return await user.create(req);
  },

  async getUser(req) {
    if (req.hasOwnProperty('id')) {
      return await user.get({ id: req.id });
    } else {
      const attrName = Object.keys(req)[0];
      const res = await user.scan(attrName).eq(req[attrName]).exec();
      return res[0];
    }
  },

  async updateUser(req) {
    return await user.update({
      id: req.id,
      name: req.name,
      email: req.email,
      password: req.password
    });
  },

  async deleteUser(req) {
    return await user.delete({ id: req.id });
  }
};

