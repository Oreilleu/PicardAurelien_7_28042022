const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { user, post } = prisma;

module.exports.getAllUser = (req, res) => {
  //   console.log(req.body);
  user
    .findMany({})
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOneUser = (req, res) => {
  const { id } = req.params;

  user
    .findUnique({
      where: { id: parseInt(id) },
    })
    .then((user) =>
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: `L'utilisateur n'existe pas ${id}` })
    )
    .catch((err) => res.status(500).json({ err }));
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { pseudo, picture } = req.body;

  // Dans la reponse le mdp transit
  req.file
    ? user
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            pseudo,
            picture: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          },
        })
        .then((user) =>
          res.status(201).json({ message: 'Utilisateur modifier', user })
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
