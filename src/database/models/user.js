const dynamoose = require('dynamoose');
const {v4: uuid } = require('uuid');
module.exports = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuid
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'CreateDate',
      updatedAt: 'UpdateDate'
    }
  }
);
