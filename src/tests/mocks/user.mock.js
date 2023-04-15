const userRepository = require('../../repository/user.repository');
const sinon = require('sinon');

const database = [
  {
    id: '1',
    name: 'Pepito Perez',
    email: 'correo@mail.com',
    password: '$2b$10$qQvZRbA2CwHS4oUpfhwrveSuuJ5HC3qwZR6QCYcQ3mRg05GOQtCXa',
    updatedAt: '2021-03-25 16:31:09.428+00',
    createdAt: '2021-03-25 16:31:09.428+00'
  }
];


sinon.stub(userRepository, 'getUser').callsFake((body) => {
  const keys = Object.keys(body);
  const fakeUser = database.find((user) => user[keys[0]] == body[keys[0]]);
  return fakeUser;
});

sinon.stub(userRepository, 'createUser').callsFake((body) => {
  body.id = Math.floor(Math.random() * 100);
  return body;
});

sinon.stub(userRepository, 'deleteUser').callsFake((body) => {
  const keys = Object.keys(body);
  const fakeUser = database.find((user) => user[keys[0]] == body[keys[0]]);
  return fakeUser ? 1 : null;
});

sinon.stub(userRepository, 'updateUser').callsFake((body) => {
  return body;
});
