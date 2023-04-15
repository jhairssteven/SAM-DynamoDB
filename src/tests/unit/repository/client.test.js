'use strict';

const clientRepository = require('../../../repository/client.repository');
const chai = require('chai');
const expect = chai.expect;

// eslint-disable-next-line prefer-const
let testingBody = {
  ID: '1022334768',
  name: 'Camilo',
  email: 'camiloTesting@mail.com',
  company: 'TheCompany name'
};


describe('Tests Client Repository', function() {
  it('Create client success', async () => {
    const result = await clientRepository.createClient(testingBody);
    expect(result).to.be.an('object');
  });

  it('Get client by ID success', async () => {
    const result = await clientRepository.getClient({ ID: testingBody.ID });
    expect(result).to.be.an('object');
    expect(result.ID).to.equal(testingBody.ID);
  });

  it('Get client by email success', async () => {
    const result = await clientRepository.getClient({ email: testingBody.email });
    expect(result).to.be.an('object');
    expect(result.email).to.equal(testingBody.email);
  });

  it('successful update client response', async () => {
    testingBody.name = 'Camilo modified2';
    const result = await clientRepository.updateClient(testingBody);
    expect(result).to.be.an('object');
    expect(result.name).to.equal(testingBody.name);
  });

  it('successful delete client response', async () => {
    const client = await clientRepository.getClient({ ID: testingBody.ID });
    expect(client.ID).to.equal(testingBody.ID);
    await clientRepository.deleteClient({ ID: testingBody.ID });

    const client2 = await clientRepository.getClient({ ID: testingBody.ID });
    expect(client2).to.equal(undefined);
  });
});
