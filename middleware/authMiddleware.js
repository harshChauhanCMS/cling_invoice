const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token is missing',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token',
      });
    }
    const { expiry } = decoded;
    const currentTime = new Date().getTime();
    if (currentTime > expiry) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    req.id = decoded.userId;
    next();
  });
}

module.exports = {
  authenticateToken,
};
