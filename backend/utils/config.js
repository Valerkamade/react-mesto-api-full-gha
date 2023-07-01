const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;
const { MONGO } = process.env;

module.exports = {
  PORT,
  SECRET,
  MONGO,
};
