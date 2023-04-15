const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const { generateToken } = require('../../service/token-security-service');
const { defaultHeaders } = require('../../utils/constants.util');
const { userRepository } = require('../../repository/index');

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
});


exports.login = async (event) => {
  const body = JSON.parse(event.body);

  const { error } = schemaLogin.validate(body);
  if (error) {
    return {statusCode: 400, headers: defaultHeaders, body: { error: error.details[0].message }};
  }

  const user = await userRepository.getUser({email: body.email});
  if (!user) {
    return {statusCode: 400, headers: defaultHeaders, body: { error: 'Usuario no encontrado' }};
  }

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    return {statusCode: 400, headers: defaultHeaders, body: { error: 'contraseña no válida' }};
  }

  const token = generateToken(body);

  return {
    statusCode: 200,
    headers: {
      auth_token: token,
      defaultHeaders
    },
    body: 'Inicio de sesión exitoso'

  };
};
