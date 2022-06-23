const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { post, like, image } = prisma;

module.exports.createPost = async (req, res) => {
  const { id } = req.params;
  const { userId, message } = req.body;

  if (userId != req.auth.user.id) {
    return res.cookie('jwt', '', { maxAge: 1 });
  }

  req.file
    ? post
        .create({
          data: {
            message,
            picture: `${req.protocol}://${req.get('host')}/images/post/${
              req.file.filename
            }`,
            User: {
              connect: {
                id: parseInt(userId),
              },
            },
          },
        })
        .then((post) => res.send(post))
        .catch((err) => {
          console.log(err);
          res.send({ err });
        })
    : post
        .create({
          data: {
            message,
            User: {
              connect: {
                id: parseInt(userId),
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

module.exports.getAllPost = (req, res) => {
  prisma.Post.findMany({
    include: {
      _count: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
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
  const { userId, message } = req.body;

  console.log(userId)

  if (userId == req.auth.user.id || req.auth.user.admin === 1) {
    req.file
    ? post
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            message,
            picture: `${req.protocol}://${req.get('host')}/images/post/${
              req.file.filename
            }`,
          },
        })
        .then((post) => {
          res.send(post);
        })
        .catch((err) => res.status(400).json({ err }))
    : post
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            message,
          },
        })
        .then((post) => res.status(201).json({ message: 'Post modifié', post }))
        .catch((err) => res.status(400).json({ err }));
  } else {
    return res.cookie('jwt', '', { maxAge: 1 });
  }

  
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;

  post
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((data) => {
      if (data.userId === req.auth.user.id || req.auth.user.admin === 1) {
        const deleteLike = like.deleteMany({
          where: {
            postId: parseInt(id),
          },
        });

        const deletePost = post.delete({
          where: {
            id: parseInt(id),
          },
        });

        prisma
          .$transaction([deleteLike, deletePost])
          .then(() => res.status(200).json({ message: 'message supprimer' }))
          .catch((err) => console.log(err));
      } else {
        return res.cookie('jwt', '', { maxAge: 1 });
      }
    })
    .catch((err) => console.log(err));
};

module.exports.getLike = (req, res) => {
  like
    .findMany({})
    .then((like) => {
      res.status(200).json(like);
    })
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
    .then((like) => res.status(200).send(like))
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
    .then((unlike) => res.status(200).send(unlike))
    .catch((err) => res.send({ message: 'Post non liké' }));
};
