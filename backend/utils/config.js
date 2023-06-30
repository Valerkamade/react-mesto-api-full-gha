const PORT = process.env.PORT || 3000;
const SECRET = process.env.NODE_EVN === 'production'
  ? process.env.JWT_SECRET
  : '6f241197a7c4082fb0426e484d2cc9c2d38f670e9c15a0d04d152f1fbeff13ff';

module.exports = {
  PORT,
  SECRET,
};
