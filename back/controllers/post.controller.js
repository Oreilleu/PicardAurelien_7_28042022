const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { post, like, image } = prisma;

module.exports.createPost = async (req, res) => {
  const { id } = req.params;
  const { userId, message } = req.body;

  req.file
    ? post
      .create({
        data: {
          userId,
          message,
          User: {
            connect: {
              id: userId,
            },
          },
        },
      })
      .then((post) =>
        image
          .create({
            data: {
              image: `${req.protocol}://${req.get('host')}/images/${req.file.filename
                }`,
              Post: {
                connect: {
                  id: JSON.parse(post.id),
                },
              },
            },
          })
          .then((post) => res.send({ post }))
          .catch((err) => res.send({ err }))
      )
      .catch((err) => res.send({ err }))
    : post
      .create({
        data: {
          message,
          User: {
            connect: {
              id: userId,
            },
          },
        },
      })
      .then((post) => res.status(200).json(post))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
};

// Renvoyé les posts par ordre chronologique -- sort ?
// Order by 
module.exports.getAllPost = (req, res) => {
  prisma.Post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOnePost = (req, res) => {
  const { id } = req.params;

  prisma.Post.findUnique({
    where: { id: parseInt(id) },
  })
    .then((post) =>
      post
        ? res.status(200).json({ post })
        : res.status(404).json({ message: `Le post n'existe pas ${id}` })
    )
    .catch((err) => res.status(500).json({ err }));
};

module.exports.updatePost = (req, res) => {
  const { id } = req.params;
  const {message, picture} = req.body
  // console.log(res.body)

  // Voir avec Yazid si ca va pas update plusieurs ligne si il y a deux photos

  req.file
    ? prisma.Post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        message,
        picture
      },
    })
      .then((post) => {
        console.log(post);
        console.log(id);
        image
          .updateMany({
            where: {
              postId: JSON.parse(id),
            },
            data: {
              image: `${req.protocol}://${req.get('host')}/images/${req.file.filename
                }`,
            },
          })
          .then((post) =>
            res.status(201).json({ message: 'post modifié', post })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => res.status(400).json({ err }))
    : prisma.Post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        message,
      },
    })
      .then((post) => res.status(201).json({ message: 'Post modifié', post }))
      .catch((err) => res.status(400).json({ err }));
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;

  // Supprimer les like en premier

  const deleteLike = like.deleteMany({
    where: {
      postId: parseInt(id)
    }
  })

  const deletePost = post.delete({
    where: {
      id: parseInt(id),
    },
  })

  prisma
    .$transaction([deleteLike, deletePost])
    .then(() => res.status(200).json({ message: 'message supprimer' }))
    .catch((err) => console.log(err))
};

module.exports.getLike = (req, res) => {
  like
    .findMany({})
    .then((like) => res.status(200).json(like))
    .catch((err) => res.status(400).json(err));
};

module.exports.likePost = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  like
    .create({
      data: {
        userId: parseInt(userId),
        postId: parseInt(id),
      },
    })
    .then(() => res.status(200).json({ message: 'post liké' }))
    // like
    //   .findUnique({
    //     where: {
    //       postId: id,
    //     },
    //   })
    //   .then((datta) => console.log(datta))
    //   .catch((err) => console.log(err))
    // )

    // Est ce que je garde comme ca ou je garde le catch pour l'erreur ? YAZID
    .catch((err) => res.send({ message: 'déja liké' }));
};

module.exports.unlikePost = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  like
    .deleteMany({
      where: {
        postId: parseInt(id),
        userId: parseInt(userId),
      },
    })
    .then((post) =>
      post.count == 0
        ? res.send({ message: 'post non liké' })
        : res.status(200).json({ message: 'post unliké' })
    )
    .catch((err) => res.send({ message: 'Post non liké' }));
};
