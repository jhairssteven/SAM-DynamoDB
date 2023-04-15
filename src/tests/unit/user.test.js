'use strict';

const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;


const createUserSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/user',
  body: JSON.stringify({
    name: 'Camilo',
    email: 'camilo@mail.com',
    password: 'passwords'
  })
};

const createUserUnsuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/user',
  body: JSON.stringify({
    name: 'Camilo',
    email: 'correo@mail.com',
    password: 'passwords'
  })
};

const userWrongInputFormat = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/user',
  body: JSON.stringify({
    name: 'Camilo',
    email: 'camilomail.com',
    password: 'passwords'
  })
};

const getUserSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'GET',
  path: '/user',
  pathParameters: {
    id: 1
  }
};

const getUserUnsuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'GET',
  path: '/user',
  pathParameters: {
    id: 3
  }
};

const deleteUserSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'DELETE',
  path: '/user',
  pathParameters: {
    id: 1
  }
};

const deleteUserUnsuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'DELETE',
  path: '/user',
  pathParameters: {
    id: 4
  }
};

const updateUserSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'PUT',
  path: '/user',
  pathParameters: {
    id: 1
  },
  body: JSON.stringify({
    name: 'Camilo',
    email: 'camilo@mail.com',
    password: 'passwords'
  })
};

describe('Tests User Service', function() {
  it('successful create user response', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.user(createUserSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });

  it('Unsuccessful create user response', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.user(createUserUnsuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
  });

  it('Unsuccessful create user response - Wrong input format', async () => {
    const result = await app.user(userWrongInputFormat);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
  });

  it('Successful get user response', async () => {
    const result = await app.user(getUserSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });

  it('Unsuccessful get user response', async () => {
    const result = await app.user(getUserUnsuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
    expect(result.body.error).to.equal('Usuario no se encuentra registrado');
  });

  it('Successful delete user response', async () => {
    const result = await app.user(deleteUserSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });

  it('Unsuccessful delete user response', async () => {
    const result = await app.user(deleteUserUnsuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
    expect(result.body.error).to.equal('Usuario no se encuentra registrado');
  });

  it('Successful update user response', async () => {
    const result = await app.user(updateUserSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
  });
});
