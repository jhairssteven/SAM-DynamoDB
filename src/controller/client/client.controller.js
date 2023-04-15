const Joi = require('@hapi/joi');

const { defaultHeaders } = require('../../utils/constants.util');
const { clientRepository } = require('../../repository/index');

exports.client = async (event) => {
  const { httpMethod } = event;
  let result;

  switch (httpMethod) {
  case 'GET':
    result = getClient(event);
    break;
  case 'POST':
    result = createClient(event);
    break;
  case 'DELETE':
    result = deleteClient(event);
    break;
  case 'PUT':
    result = updateClient(event);
    break;
  default:
    throw new Error(`httpMethod only accepts GET, POST, PUT, DELETE method, you tried:
    ${event.httpMethod} method.`);
  }

  return result;
};

const schemaClient = Joi.object({
  ID: Joi.string().min(3).max(1024).required(),
  name: Joi.string().min(3).max(1024).required(),
  email: Joi.string().min(6).max(255).required().email(),
  company: Joi.string().min(3).max(1024)
});


const createClient = async (event) => {
  console.log('Hola from create client');
  const body = JSON.parse(event.body);

  const { error } = schemaClient.validate(body);
  if (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: error.details[0].message }
    };
  }

  let client = await clientRepository.getClient({ email: body.email });
  if (client) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Cliente ya se encuentra registrado' }
    };
  }

  client = await clientRepository.createClient(body);

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      client: client
    }
  };
};

const getClient = async (event) => {
  const { ID } = event.pathParameters;

  const client = await clientRepository.getClient({ ID: ID });
  if (!client) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Cliente no se encuentra registrado' }
    };
  }

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      client: client
    }
  };
};

const deleteClient = async (event) => {
  const { ID } = event.pathParameters;

  const client = await clientRepository.deleteClient({ ID: ID });
  if (!client) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Cliente no se encuentra registrado' }
    };
  }

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      client: client
    }
  };
};

const updateClient = async (event) => {
  const body = JSON.parse(event.body);
  const { ID } = event.pathParameters;
  body.ID = ID;
  const { error } = schemaClient.validate(body);
  if (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: error.details[0].message }
    };
  }

  let client = await clientRepository.getClient({ ID: ID });
  if (!client) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: { error: 'Cliente no se encuentra registrado' }
    };
  }

  client = await clientRepository.updateClient(body);

  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: {
      client: client
    }
  };
};
