const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  //   try {
  //     const products = await prisma.User.findMany({});
  //     res.json(products);
  //   } catch (error) {
  //     console.log(error);
  //     res.send('no');
  //   }
  prisma.User.findMany({})
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(400).json({ err }));
  //   .findMany({})
  //   .then((user) => res.send('ok'))
  //   .catch((err) => res.send('ko'));
});

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
