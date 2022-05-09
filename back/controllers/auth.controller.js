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
    return false;
  } else {
    return true;
  }
}

function checkPassword(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

module.exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;

  checkPseudo;
  // if (pseudo.length < 3 || pseudo > 50) true;
  // else throw Error('Invalid pseudo');

  try {
    if (isEmail(email) && checkPseudo(pseudo) && checkPassword(password)) {
      console.log(isEmail(email), checkPseudo(pseudo));
      bcrypt.hash(password, 10).then((hash) => {
        const data = { pseudo, email, password: hash };

        user
          .create({ data })
          .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
          .catch((err) => res.status(400).json({ err }));
      });
    } else {
      // if (!isEmail(email) && !checkPseudo(pseudo) && !checkPassword(password)) {
      //   throw Error('invalid email and pseudo and password');
      // }
      if (!isEmail(email)) {
        throw Error('invalid email');
      }
      if (!checkPseudo(pseudo)) {
        throw Error('invalid pseudo');
      }
      if (!checkPassword(password)) {
        throw Error('invalid password');
      }
    }
  } catch (err) {
    const errors = signUpErrors(err);
    res.send({ errors });
  }

  // if (pseudo.length < 3) {
  //   throw Error;
  // } else {
  //   console.log('false');
  // }

  // if (!isEmail(email)) console.log(isEmail.error);
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
    .catch(() => res.status(400).json({ error: 'Email incorrect' }));
};
