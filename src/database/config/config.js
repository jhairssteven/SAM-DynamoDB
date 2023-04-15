module.exports = {
  'development': {
    'endpoint': 'http://dynamodb-local:8000'
  },
  'test': {
    'endpoint': 'http://localhost:8000'
  },
  'prod': {
    'accessKeyId': process.env.AKID,
    'secretAccessKey': process.env.SECRET,
    'region': 'us-west-2'
  }
};
