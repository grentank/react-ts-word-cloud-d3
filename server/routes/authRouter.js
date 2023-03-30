const express = require('express');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post('/signin', async (req, res) => {
  const { email, secret } = req.body;
  if (secret !== process.env.SIGN_IN_SECRET) return res.sendStatus(401);

  req.session.user = {
    id: req.session.id,
    email,
    guest: false,
    host: true,
    currentQuestion: res.locals.currentQuestion,
  };
  return res.json({ ...req.session.user, currentQuestion: res.locals.currentQuestion });
});

authRouter.get('/check', async (req, res) => {
  if (req.session.user?.host) {
    return res.json({ ...req.session.user, currentQuestion: res.locals.currentQuestion });
  }
  if (req.session.user?.guest) {
    return res.json({ ...req.session.user, currentQuestion: res.locals.currentQuestion });
  }
  req.session.user = {
    id: req.session.id,
    guest: true,
    host: false,
    answers: [],
    currentQuestion: res.locals.currentQuestion,
  };
  console.log('creating session', req.session.user);
  return res.json({ ...req.session.user, currentQuestion: res.locals.currentQuestion });
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.sendStatus(200);
});

module.exports = authRouter;
