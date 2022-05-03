const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.createPost = (req, res) => {
    const { id } = req.params
    const { userId, message, picture, video } = req.body
    // const data = { userId, message, picture, video }
    prisma.Post.create({
        // Comment passer dinamiquement le userId ??
        data: {
            userId: parseInt(userId),
            message: message,
            picture,
            video
        }
    })
        .then(() => { res.status(201).json({ message: "post créer" }) })
        .catch(err => res.status(400).json({ err }))
}

module.exports.getAllPost = (req, res) => {
    //   console.log(req.body);
    prisma.Post.findMany({})
        .then((post) => res.status(200).json({ post }))
        .catch((err) => res.status(400).json({ err }));

    //   try {
    //     const products = await prisma.User.findMany({});
    //     res.json(products);
    //   } catch (error) {
    //     console.log(error);
    //     res.send('no');
    //   }
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
            video
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

