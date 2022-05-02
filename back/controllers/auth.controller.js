const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: '12h',
  });
}

module.exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const data = { pseudo, email, password: hash };
    // password = hash;

    // A quoi sert le select ??? YAZID
    // const select = { id: true, email: true }
    prisma.User.create({ data })
      .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
      .catch((err) => res.status(400).json({ err }));
  });

  // async function main() {
  //     const newUser = await prisma.User.create({
  //         data: {
  //             pseudo,
  //             email,
  //             password
  //         },
  //         select: {
  //             id: true,
  //             email: true
  //         }
  //     })
  //     console.log(newUser)
  // }
  // main().catch(err => res.send('marche pas'))
};

module.exports.signIn = (req, res) => {
  const { email, password } = req.body;

  prisma.User.findUnique({
    where: {
      email,
    },
  })
    .then((user) => {
      console.log(user);
      bcrypt
        .compare(password, user.password)
        .then((controlPassword) => {
          if (!controlPassword) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }

          //Génère un token si le password est ok
          const token = createToken(user.id);
          console.log(token);

          // Réponse
          res.status(200).json({ userId: user.id, token });
        })
        .catch((err) =>
          res.status(400).json({ message: "L'utilisateur n'existe pas" + err })
        );
    })
    .catch(() => res.status(400).json({ error: 'Email incorrect' }));
};
