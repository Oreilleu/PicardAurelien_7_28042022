const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.createPost = (req, res) => {
  const { id } = req.params;
  const { userId, message, picture, video } = req.body;
  // const data = { userId, message, picture, video }
  prisma.Post.create({
    // Comment passer dinamiquement le userId ??
    data: {
      userId: parseInt(userId),
      message: message,
      picture,
      video,
    },
  })
    .then(() => {
      res.status(201).json({ message: 'post créer' });
    })
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getAllPost = (req, res) => {
  //   console.log(req.body);
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
  // Sur la route like, je veux ajouter l'id des params dans la colonne postID
  // Ajouter le userId dans la colonne userID

  // prisma.Post.findUnique({
  //   where: {
  //     id: parseInt(id),
  //     // userId: parseInt(userId)
  //   }
  // })
  //   // Si je le post est trouvé je vérifie que le user ID est présent pour le post
  //   .then(post => post
  //     ? res.send('ok')
  //     // (prisma.Like.findUnique({
  //     //   where: {
  //     //     userId: parseInt(userId)
  //     //   },
  //     // })
  //     //   .then(user => user ? res.send('ok') : res.send('ko'))
  //     //   .catch(err => res.send({ err })))
  //     : res.send('pas trouvé'))
  //   .catch(err => console.log({ err }))


  (prisma.Like.findMany({
    // where: {
    //   userId: parseInt(userId)
    // },
    where: {
      postId: parseInt(id)
    }
  })
    .then(user => user ? res.send({ user }) : res.send('ko'))
    .catch(err => res.send({ err })))
  // prisma.like.create({
  //   data: {
  //     userId: parseInt(userId),
  //     postId: parseInt(id)
  //   }
  // })
  //   .then(() => res.send('Post liké'))
  //   .catch((err) => res.send({ err }))

  // Puis je veux vérifier que le userId n'est pas deja présent dans la colonne de postId
};

module.exports.unlikePost = (req, res) => { };
