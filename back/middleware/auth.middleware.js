const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
    const userId = decodeToken.id;
    // console.log(userId);
    // console.log(req.body.userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw res.status(403).json({ message: 'unauthorized request 1' });
    } else {
      next();
    }
  } catch (err) {
    res.status(403).json({ message: 'unauthorized request 2' });
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id)
        next()
      }
    })
  } else {
    console.log('No token')
  }
}