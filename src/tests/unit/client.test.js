'use strict';

const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;


const createClientSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/client',
  body: JSON.stringify({
    ID: '1022334768',
    name: 'Camilo',
    email: 'camilo@mail.com',
    company: 'TheCompany name'
  })
};

// repeated email
const createClientUnsuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/client',
  body: JSON.stringify({
    ID: '1022334768',
    name: 'Camilo',
    email: 'correo@mail.com',
    company: 'TheCompany name'
  })
};

const clientWrongMailFormat = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/client',
  body: JSON.stringify({
    ID: '1022334768',
    name: 'Camilo',
    email: 'camilomail.com',
    company: 'TheCompany name'
  })
};

const getClientSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'GET',
  path: '/client',
  pathParameters: {
    ID: '1022334768'
  }
};

const getClientUnsuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'GET',
  path: '/client',
  pathParameters: {
    ID: '1022334s2'
  }
};

const deleteClientSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'DELETE',
  path: '/client',
  pathParameters: {
    ID: '1022334768'
  }
};

const deleteClientUnsuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'DELETE',
  path: '/client',
  pathParameters: {
    ID: '4'
  }
};

const updateClientSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'PUT',
  path: '/client',
  pathParameters: {
    ID: '1022334768'
  },
  body: JSON.stringify({
    name: 'Camilo2',
    email: 'camilo2@mail.com',
    company: 'Updated Company name'
  })
};

describe('Tests Client Service', function() {
  it('successful create client response', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.client(createClientSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });

  it('Unsuccessful create client response', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.client(createClientUnsuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
  });

  it('Unsuccessful create client response - Wrong input format', async () => {
    const result = await app.client(clientWrongMailFormat);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
  });

  it('Successful get client response', async () => {
    const result = await app.client(getClientSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });

  it('Unsuccessful get client response', async () => {
    const result = await app.client(getClientUnsuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
    expect(result.body.error).to.equal('Cliente no se encuentra registrado');
  });

  it('Successful delete client response', async () => {
    const result = await app.client(deleteClientSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });

  it('Unsuccessful delete client response', async () => {
    const result = await app.client(deleteClientUnsuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
    expect(result.body.error).to.equal('Cliente no se encuentra registrado');
  });

  it('Successful update client response', async () => {
    const result = await app.client(updateClientSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });
});
