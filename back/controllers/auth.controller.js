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

    prisma.User.create({ data })
      .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
      .catch((err) => res.status(400).json({ err }));
  });
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

          //Génère un token si le password est ok et le passe en cookie
          const token = createToken(user.id);
          // res.cookie('jwt', token, { httpOnly: true, expiresIn: '12h' })

          // Réponse
          res.status(200).json({ userId: user.id, token });
        })
        .catch((err) =>
          res.status(400).json({ message: "L'utilisateur n'existe pas" + err })
        );
    })
    .catch(() => res.status(400).json({ error: 'Email incorrect' }));
};
