const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { post, like, comments } = prisma;

module.exports.createPost = (req, res) => {
  const { id } = req.params;
  const { userId, message, picture, video } = req.body;
  post
    .create({
      data: {
        message,
        picture,
        video,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    })
    .then(() => {
      res.status(201).json({ message: 'post créer' });
    })
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getAllPost = (req, res) => {
  prisma.Post.findMany({})
    .then((post) => res.status(200).json({ post }))
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
  const { message, picture, video } = req.body;

  prisma.Post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      message,
      picture,
      video,
    },
  })
    .then(() => res.status(201).json({ message: 'Post modifer' }))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;

  prisma.Post.delete({
    where: {
      id: parseInt(id),
    },
  })
    .then(() => res.status(201).json({ message: 'Post supprimer' }))
    .catch((err) => res.status(400).json({ err }));
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

  like.deleteMany({
    where: {
      postId: parseInt(id),
      userId: parseInt(userId)
    }
  })
    .then((post) =>
      post.count == 0 ?
        res.send({ message: "post non liké" })
        :
        res.status(200).json({ message: 'post unliké' })
    )
    .catch((err) => res.send({ message: 'Post non liké' }))
};

module.exports.commentPost = (req, res) => {
  // YAZID - Voir pour afficher l'array des posts coter front
  // YAZID - La je recup l'id du post et pour update et delete l'id du comment ?

  const { id } = req.params
  const { userId, message, picture } = req.body

  comments.create({
    data: {
      message,
      picture,
      Post: {
        connect: {
          id: parseInt(id)
        }
      },
      User:{
        connect:{
          id: parseInt(userId)
        }
      }
    }
  })
    .then((post) => res.status(201).json({ post }))
    .catch((err) => res.status(400).json({ err }))
}

module.exports.updateCommentPost = (req, res) => {
  const {id} = req.params
  const {message, picture} = req.body


  comments.update({
    where: {
      id: parseInt(id)
    },
    data:{
      message,
      picture
    }
  })
  .then((comment) => res.status(201).json({comment}))
  .catch((err) => res.status(201).json({err}))
}

module.exports.deleteCommentPost = (req, res) => {
  const {id} = req.params

  comments.delete({
    where: {
      id: parseInt(id)
    }
  })
  .then(() => res.status(200).json({message : 'comment delete'}))
  .catch((err) => res.status(400).json({err}))

}