const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
const path = require('path');
const { requireAuth } = require('./middleware/auth.middleware');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionsId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

// config
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
// app.get('/jwtid', requireAuth, (req, res) => {
//   res.status(200).send(res.locals)
// })

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
