const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { post, like, image } = prisma;

module.exports.createPost = async (req, res) => {
  const { id } = req.params;
  const { userId, message } = req.body;

  console.log(req.file);

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
        .then(
          (post) => res.send(post)
          // image
          //   .create({
          //     data: {
          //       image: `${req.protocol}://${req.get('host')}/images/post/${
          //         req.file.filename
          //       }`,
          //       Post: {
          //         connect: {
          //           id: JSON.parse(post.id),
          //         },
          //       },
          //     },
          //   })
          //   .then((post) => res.send({ post }))
          //   .catch((err) => {
          //     console.log(err);
          //     res.send({ err });
          //   })
        )
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

// Renvoyé les posts par ordre chronologique -- sort ?
// Order by
module.exports.getAllPost = (req, res) => {
  prisma.Post.findMany({
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
  const { message } = req.body;

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
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;

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
};

module.exports.getLike = (req, res) => {
  like
    .findMany({})
    .then((like) => {
      console.log(like);
      res.status(200).json(like);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.likePost = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  let count = 0;

  like
    .create({
      data: {
        userId: parseInt(userId),
        postId: parseInt(id),
      },
    })
    .then(
      (like) => res.status(200).json(like)
      // postLike.map((post) => {
      //   console.log(postLike);
      //   if (postLike.postId === id) {
      //     count++;
      //   }
      //   res.status(200).send(count);
      // })
      // res.status(200).json({ message: 'post liké' }
    )
    .catch((err) => res.send({ message: 'déja liké' }));
};

module.exports.unlikePost = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  // Faire un tableau ici qui renvoi le nombre de fois ou le postId = userId

  like
    .deleteMany({
      where: {
        postId: parseInt(id),
        userId: parseInt(userId),
      },
    })
    .then(
      (post) => console.log(post)
      // post.count == 0
      //   ? res.send({ message: 'post non liké' })
      //   : post.map((postLike) => {
      //       let compt = 0;
      //       if (postLike.postId === id) {
      //         compt++;
      //       }
      //       res.status(200).json(compt);
      //     })
    )
    .catch((err) => res.send({ message: 'Post non liké' }));
};
