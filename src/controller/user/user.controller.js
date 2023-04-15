const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const { defaultHeaders } = require('../../utils/constants.util');
const { userRepository } = require('../../repository/index');

exports.user = async (event) => {
  const { httpMethod } = event;
  let result;

  switch (httpMethod) {
  case 'GET':
    result = getUser(event);
    break;
  case 'POST':
    result = createUser(event);
    break;
  case 'DELETE':
    result = deleteUser(event);
    break;
  case 'PUT':
    result = updateUser(event);
    break;
  default:
    throw new Error(`httpMethod only accepts GET, POST, PUT, DELETE method, you tried:
    ${event.httpMethod} method.`);
  }

  return result;
};

const schemaUser = Joi.object({
  name: Joi.string().min(6).max(1024).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
});


const createUser = async (event) => {
  const body = JSON.parse(event.body);

  const { error } = schemaUser.validate(body);
  if (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: error.details[0].message }
    };
  }

  let user = await userRepository.getUser({ email: body.email });
  if (user) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Usuario ya se encuentra registrado' }
    };
  }

  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password, salt);
  user = await userRepository.createUser(body);

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      user: user
    }
  };
};

const getUser = async (event) => {
  const { id } = event.pathParameters;

  const user = await userRepository.getUser({ id: id });
  if (!user) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Usuario no se encuentra registrado' }
    };
  }

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      user: user
    }
  };
};

const deleteUser = async (event) => {
  const { id } = event.pathParameters;

  const user = await userRepository.deleteUser({ id: id });
  if (!user) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Usuario no se encuentra registrado' }
    };
  }

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      user: user
    }
  };
};

const updateUser = async (event) => {
  const body = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const { error } = schemaUser.validate(body);
  if (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: error.details[0].message }
    };
  }

  let user = await userRepository.getUser({ id: id });
  if (!user) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Usuario no se encuentra registrado' }
    };
  }

  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password, salt);
  body.id = id;
  user = await userRepository.updateUser(body);

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      user: user
    }
  };
};
