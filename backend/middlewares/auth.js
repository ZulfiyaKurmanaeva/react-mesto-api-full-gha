const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const { secret } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация!'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, secret, { expiresIn: '7d' });
  } catch (err) {
    return next(new NotAuthError('Пройдите авторизацию!'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
