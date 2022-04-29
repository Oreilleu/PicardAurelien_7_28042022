const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

module.exports.signUp = (req, res) => {
    const { pseudo, email, password } = req.body

    bcrypt.hash(password, 10)
        .then(hash => {
            const data = { pseudo, email, password: hash }

            // A quoi sert le select ??? YAZID
            // const select = { id: true, email: true }
            prisma.user.create({ data })
                .then(() => res.status(201).json({ message: "Utilisateur créé" }))
                .catch((err) => res.status(400).json({ err }))
        })

    // async function main() {
    //     const newUser = await prisma.User.create({
    //         data: {
    //             pseudo,
    //             email,
    //             password
    //         },
    //         select: {
    //             id: true,
    //             email: true
    //         }
    //     })
    //     console.log(newUser)
    // }
    // main().catch(err => res.send('marche pas'))
}

module.exports.signIn = (req, res) => {
    const { email, password } = req.body

    prisma.user.findMany({
        select: {
            email: true
        },
        orderBy: {
            lastName: 'asc'
        },
        where: {
            password: {

            }
        }

    })
}