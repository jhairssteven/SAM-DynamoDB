'use strict';

const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;


const loginSuccess = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/login',
  body: JSON.stringify({
    email: 'correo@mail.com',
    password: 'passwords'
  })
};

const loginUnsuccessWrongPassword = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/login',
  body: JSON.stringify({
    email: 'correo@mail.com',
    password: 'password'
  })
};

const loginUnsuccessUserInvalid = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/login',
  body: JSON.stringify({
    email: 'corre@mail.com',
    password: 'password'
  })
};

const emailWrongFormat = {
  headers: JSON.stringify({
    'X-Forwarded-For': '127.0.0.1'
  }),
  httpMethod: 'POST',
  path: '/login',
  body: JSON.stringify({
    email: 'correomail.com',
    password: 'password'
  })
};

describe('Tests Login Service', function() {
  it('Login successful response', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.login(loginSuccess);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');
    expect(result.body).to.equal('Inicio de sesión exitoso');
  });

  it('Login unsuccessful response - Password wrong', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.login(loginUnsuccessWrongPassword);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
    expect(result.body.error).to.equal('contraseña no válida');
  });

  it('Login unsuccessful response - User invalid', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.login(loginUnsuccessUserInvalid);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
    expect(result.body.error).to.equal('Usuario no encontrado');
  });

  it('Login unsuccessful response - password wrong format', async () => {
    process.env.SECRET = 'mysupersecretpassword';
    const result = await app.login(emailWrongFormat);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(400);
    expect(result.body.error).to.be.an('string');
  });
});
