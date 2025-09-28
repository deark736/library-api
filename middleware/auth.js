// middleware/auth.js
function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'Authentication required' });
}

module.exports = { ensureAuth };
