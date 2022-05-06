const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { } = prisma;

module.exports.checkUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        const userId = decodeToken.id;
        if (req.body.userId && req.body.userId !== userId) {
            throw res.status(403).json({ message: 'unauthorized request 1' })
        } else {
            next();
        }
    } catch (err) {
        res.status(403).json({ message: 'unauthorized request 2' })
    }

}