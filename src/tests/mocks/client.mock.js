const clientRepository = require('../../repository/client.repository');
const sinon = require('sinon');

const database = [
  {
    ID: '1022334768',
    name: 'El nombre o los nombres',
    email: 'correo@mail.com',
    company: 'TheCompany name',
    updatedAt: '2021-03-25 16:31:09.428+00',
    createdAt: '2021-03-25 16:31:09.428+00'
  }
];

sinon.stub(clientRepository, 'getClient').callsFake((body) => {
  const keys = Object.keys(body);
  const fakeClient = database.find((client) => client[keys[0]] == body[keys[0]]);
  return fakeClient;
});

sinon.stub(clientRepository, 'createClient').callsFake((body) => {
  return body;
});

sinon.stub(clientRepository, 'deleteClient').callsFake((body) => {
  const keys = Object.keys(body);
  const fakeClient = database.find((client) => client[keys[0]] == body[keys[0]]);
  return fakeClient ? 1 : null;
});

sinon.stub(clientRepository, 'updateClient').callsFake((body) => {
  return body;
});
