const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.checkUser = (req, res, next) => {
  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie('jwt', '', { maxAge: 1 });
      } else {
        let user = await prisma.user.findUnique({
          where: { id: decodedToken.id },
        });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
