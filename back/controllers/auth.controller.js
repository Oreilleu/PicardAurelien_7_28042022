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

function checkPseudo(pseudo) {
  if (pseudo.length < 3 || pseudo.length > 50) {
    return res.send({ message: 'pseudo incorrect' });
  } else {
    return true;
  }
}

function checkPassword(password) {
  if (password.length < 6) {
    return res.send({ message: 'mot de passe trop court' });
  } else {
    return true;
  }
}

module.exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;

  // checkPseudo;
  // if (pseudo.length < 3 || pseudo > 50) true;
  // else throw Error('Invalid pseudo');

  if (!isEmail(email)) return res.send({ message: 'email incorrect' });
  if (!checkPseudo(pseudo)) return res.send({ message: 'pseudo incorrect' });
  if (!checkPassword(password))
    return res.send({ message: 'password incorrect' });

  bcrypt.hash(password, 10).then((hash) => {
    const data = { pseudo, email, password: hash };

    user
      .create({ data })
      .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
      .catch((err) => {
        // console.log(err);
        if (err.meta.target.includes('pseudo'))
          res.send({ message: 'pseudo déja pris' });
        else if (err.meta.target.includes('email'))
          res.send({ message: 'email déja pris' });
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
