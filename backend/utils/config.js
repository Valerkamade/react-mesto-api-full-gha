const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET = '6f241197a7c4082fb0426e484d2cc9c2d38f670e9c15a0d04d152f1fbeff13ff',
  NODE_ENV,
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO,
  NODE_ENV,
};
