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
  };
  return res.json({ ...req.session.user });
});

authRouter.get('/check', async (req, res) => {
  if (req.session.user?.host) {
    return res.json({ ...req.session.user });
  }
  if (req.session.user?.guest) {
    return res.json({ ...req.session.user });
  }
  // console.log('creating session');
  req.session.user = {
    id: req.session.id,
    guest: true,
    host: false,
    answers: [],
  };
  return res.json({ ...req.session.user });
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.sendStatus(200);
});

module.exports = authRouter;
