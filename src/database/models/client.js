const dynamoose = require('dynamoose');

module.exports = new dynamoose.Schema(
  {
    ID: {
      type: String,
      hashKey: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    company: String
  },
  {
    timestamps: {
      createdAt: 'CreateDate',
      updatedAt: 'UpdateDate'
    }
  }
);
