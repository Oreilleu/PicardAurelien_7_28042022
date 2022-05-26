const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { user } = prisma;

const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== 'image/jpg' &&
      req.file.detectedMimeType !== 'image/jpeg' &&
      req.file.detectedMimeType !== 'image/png'
    ) {
      throw Error('invalid file');
    }

    if (req.file.size > 500000) throw Error('max size');
  } catch (err) {
    res.status(201).json(err);
  }

  const fileName = JSON.stringify(req.body.pseudo) + '.jpg';

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/profil/${fileName}`)
  );
};
