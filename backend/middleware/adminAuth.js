const crypto = require('crypto');
module.exports = (req, res, next) => {
  const expected = process.env.ADMIN_KEY;
  const provided = req.get('x-admin-key');
  if (!expected || !provided) return res.status(401).json({ success: false, message: 'Admin key required' });
  const a = Buffer.from(expected);
  const b = Buffer.from(provided);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ success: false, message: 'Invalid admin key' });
  }
  next();
};
