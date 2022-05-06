const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.getAllUser = (req, res) => {
  //   console.log(req.body);
  prisma.User.findMany({})
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOneUser = (req, res) => {
  const { id } = req.params;

  prisma.User.findUnique({
    where: { id: parseInt(id) },
  })
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: `L'utilisateur n'existe pas ${id}` })
    )
    .catch((err) => res.status(500).json({ err }));
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { pseudo } = req.body;

  prisma.User.update({
    where: {
      id: parseInt(id),
    },
    data: {
      pseudo,
    },
  })
    .then(() => res.status(201).json({ message: 'Utilisateur modifer' }))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const deletePost = prisma.Post.deleteMany({
    where: {
      userId: parseInt(id)
    }
  })

  const deleteUser = prisma.User.delete({
    where: {
      id: parseInt(id)
    }
  })

  prisma.$transaction([deletePost, deleteUser])
    .then(() => res.status(201).json({ message: 'Utilisateur supprimer' }))
    .catch((err) => res.status(400).json({ err }));
};
