const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { user } = prisma;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');
const { signUpErrors } = require('../utils/error.utils');

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: '12h',
  });
}

module.exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;

  // Sometimes strange error when i put a lots of same carac
  // Try to make again
  function checkPseudo(pseudo) {
    if (pseudo.length < 3 || pseudo.length > 50) {
      return res.status(400).json({
        message: 'Le doit être supèrieur à 3 et infèrieur à 50 caractères',
      });
    } else {
      return true;
    }
  }

  function checkPassword(password) {
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Le mot de passe doit être supèrieur à 6 caractères',
      });
    } else {
      return true;
    }
  }

  if (!isEmail(email))
    return res.status(400).json({ message: "L'email est incorrect" });

  checkPseudo(pseudo);
  checkPassword(password);

  bcrypt.hash(password, 10).then((hash) => {
    const data = { pseudo, email, password: hash };

    user
      .create({ data })
      .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
      .catch((err) => {
        if (err.meta.target.includes('pseudo'))
          return res.status(400).json({ message: 'Le pseudo est déja pris' });

        if (err.meta.target.includes('email'))
          return res.status(400).json({ message: "L'email est déja pris" });
      });
  });
};

module.exports.signIn = (req, res) => {
  const { email, password } = req.body;

  user
    .findUnique({
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
    .catch(() => res.status(400).json({ error: 'Email inconnu' }));
};
