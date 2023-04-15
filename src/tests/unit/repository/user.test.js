'use strict';

const userRepository = require('../../../repository/user.repository');
const chai = require('chai');
const expect = chai.expect;

// eslint-disable-next-line prefer-const
let testingBody = {
  name: 'Camilo',
  email: 'camiloTesting@mail.com',
  password: 'passwords'
};


describe('Tests User Repository', function() {
  it('Create user success', async () => {
    const result = await userRepository.createUser(testingBody);
    testingBody.id = result.id;
    expect(result).to.be.an('object');
  });

  it('Get user by id success', async () => {
    const result = await userRepository.getUser({ id: testingBody.id });
    expect(result).to.be.an('object');
    expect(result.id).to.equal(testingBody.id);
  });

  it('Get user by email success', async () => {
    const result = await userRepository.getUser({ email: testingBody.email });
    expect(result).to.be.an('object');
    expect(result.email).to.equal(testingBody.email);
  });

  it('successful update user response', async () => {
    testingBody.name = 'Camilo modified';
    const result = await userRepository.updateUser(testingBody);
    expect(result).to.be.an('object');
    expect(result.name).to.equal(testingBody.name);
  });

  it('successful delete user response', async () => {
    const user = await userRepository.getUser({ id: testingBody.id });
    expect(user.id).to.equal(testingBody.id);
    await userRepository.deleteUser({ id: testingBody.id });

    const userExists = await userRepository.getUser({ id: testingBody.id });
    expect(userExists).to.equal(undefined);
  });
});
