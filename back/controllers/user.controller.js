const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { user, post } = prisma;

module.exports.getAllUser = (req, res) => {
  //   console.log(req.body);
  user
    .findMany({
      select : {
        id: true,
        pseudo: true,
        email: true,
        picture: true,
        admin: true,
        posts: true,
        like: true,
      }
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOneUser = (req, res) => {
  const { id } = req.params;

  user
    .findUnique({
      where: { 
        id: parseInt(id) 
      },
      select : {
        id: true,
        pseudo: true,
        email: true,
        picture: true,
        admin: true,
        posts: true,
        like: true,
      }
    })
    .then((user) =>
      user
      // Condition user et delete .password
        ? res.status(200).json(user)
        : res.status(404).json({ message: `L'utilisateur n'existe pas ${id}` })
    )
    .catch((err) => res.status(500).json({ err }));
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { pseudo } = req.body;

  console.log(req.file)

  req.file
    ? user
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            pseudo,
            picture: `${req.protocol}://${req.get('host')}/images/profil/${
              req.file.filename
            }`,
          },
        })
        .then(() =>
          res.status(201).json({ message: 'Utilisateur modifier' })
        )
        .catch((err) => console.log(err))
    : user
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            pseudo,
          },
        })
        .then(() => res.status(201).json({ message: 'Utilisateur modifer &' }))
        .catch((err) => res.status(400).json({ err }));
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const deletePost = post.deleteMany({
    where: {
      userId: parseInt(id),
    },
  });

  const deleteUser = user.delete({
    where: {
      id: parseInt(id),
    },
  });

  prisma
    .$transaction([deletePost, deleteUser])
    .then(() => res.status(201).json({ message: 'Utilisateur supprimer' }))
    .catch((err) => res.status(400).json({ err }));
};
