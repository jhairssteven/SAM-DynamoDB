const dynamoose = require('dynamoose');
const envConfig = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[envConfig];

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB(config);

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const userSchema = require('./models/user');
const clientSchema = require('./models/client');

const user = dynamoose.model('UserTable', userSchema);
const client = dynamoose.model('ClientTable', clientSchema);

module.exports = {
  user,
  client
};
