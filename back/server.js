const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
const path = require('path');
const { requireAuth, checkUser } = require('./middleware/auth.middleware');

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
app.use(cookieParser());
// app.use('/images', express.static(path.join(__dirname, 'images')));

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  // console.log(res.locals)
  if(res.locals.user === null) return console.log('No token')
  res.status(200).json(res.locals.user.id);
});

// routes
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
