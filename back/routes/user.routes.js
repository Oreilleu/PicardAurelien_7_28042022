const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/register', authCtrl.signUp)
router.post('/login', authCtrl.signIn)

// router.get('/:id', (req, res) => {
//   res.send({ message: 'ok' });
// });

// router.post('/', (req, res) => {
//   res.send({ message: 'ok' });
// });

// router.delete('/:id', (req, res) => {
//   res.send({ message: 'ok' });
// });

// router.put('/:id', (req, res) => {
//   res.send({ message: 'ok' });
// });

module.exports = router;