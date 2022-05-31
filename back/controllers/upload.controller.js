// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const { user } = prisma;

// const fs = require('fs');
// const { nextTick } = require('process');
// const { promisify } = require('util');
// const pipeline = promisify(require('stream').pipeline);

// module.exports.uploadProfil = async (req, res) => {
//   try {
//     if (
//       req.file.detectedMimeType !== 'image/jpg' &&
//       req.file.detectedMimeType !== 'image/jpeg' &&
//       req.file.detectedMimeType !== 'image/png'
//     ) {
//       throw Error('invalid file');
//     }

//     if (req.file.size > 500000) throw Error('max size');
//   } catch (err) {
//     res.status(201).json(err);
//   }

//   const fileName = JSON.stringify(req.body.pseudo) + '.jpg';

//   await pipeline(
//     req.file.stream,
//     fs.createWriteStream(`${__dirname}/../images/profil/${fileName}`)
//   );
// };

// module.exports.uploadPost = async (req, res, next) => {
//   const { file } = req;
//   const { message, userId } = req.bodys;

//   if (file.detectedFileExtension !== '.jpeg') next(new Error('invalid file'));

//   await pipeline(
//     file.stream,
//     fs.createWriteStream(`${__dirname}/../images/post/${fileName}`)
//   );

//   const fileName =
//     userId + '.' + Math.floor(Math.random * 1000) + file.detectedFileExtension;

//   res.send('file uploaded as');
// };
