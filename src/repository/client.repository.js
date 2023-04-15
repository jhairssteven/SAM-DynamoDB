const { client } = require('../database/db');

module.exports = {
  async createClient(req) {
    return await client.create(req);
  },

  async getClient(req) {
    if (req.hasOwnProperty('ID')) {
      return await client.get({ ID: req.ID });
    } else {
      const attrName = Object.keys(req)[0];
      const res = await client.scan(attrName).eq(req[attrName]).exec();
      return res[0];
    }
  },

  async updateClient(req) {
    return await client.update({
      ID: req.ID,
      name: req.name,
      email: req.email,
      company: req.company
    });
  },

  async deleteClient(req) {
    return await client.delete({ ID: req.ID });
  }
};

