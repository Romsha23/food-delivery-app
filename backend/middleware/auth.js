const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtSecret = process.env.JWT_TOKEN_SECRET || crypto.randomBytes(32).toString('hex');
module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ success: false, message: 'Token is missing' });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.body.userId = decoded.id;
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};