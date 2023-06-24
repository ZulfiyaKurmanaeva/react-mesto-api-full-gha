const {
  NODE_ENV,
  JWT_SECRET,
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const secret = NODE_ENV === 'production' ? JWT_SECRET : 'JWT-token';

module.exports = {
  PORT,
  MONGO_DB,
  secret,
};
