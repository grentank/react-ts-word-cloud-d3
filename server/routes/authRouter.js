const express = require('express');
const bcrypt = require('bcrypt');
const { User, Answer } = require('../db/models');
require('dotenv').config();

const authRouter = express.Router();

// authRouter.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name && !email && !password) return res.sendStatus(401);
//   try {
//     const [user, created] = await User.findOrCreate({
//       where: { email },
//       defaults: {
//         password: await bcrypt.hash(password, 10),
//         name,
//       },
//     });
//     if (!created) return res.sendStatus(401);
//     req.session.user = { id: user.id, name, email };
//     return res.json({ ...req.session.user });
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(401);
//   }
// });

authRouter.post('/signin', async (req, res) => {
  const { email, secret } = req.body;
  if (secret !== process.env.SIGN_IN_SECRET) return res.sendStatus(401);
  // if (!email && !password) return res.sendStatus(401);
  // try {
  //   const user = await User.findOne({ where: { email } });
  //   if (!user) return res.sendStatus(401);
  //   if (user && (await bcrypt.compare(password, user.password))) {

  req.session.user = {
    id: req.session.id,
    email,
    guest: false,
    host: true,
  };
  await User.create({ where: { sessionId: req.session.id } });
  return res.json({ ...req.session.user });
  //   }
  //   return res.sendStatus(401);
  // } catch (err) {
  //   console.log(err);
  //   return res.sendStatus(500);
  // }
});

authRouter.get('/check', async (req, res) => {
  if (req.session.user?.host) {
    return res.json({ ...req.session.user });
  }
  if (req.session.user?.guest) {
    const curUser = await User.findOne({
      where: { sessionId: req.session.id },
      include: Answer,
    });
    return res.json({
      ...req.session.user,
      answers: curUser?.Answers?.map((el) => el.body) || [],
    });
  }
  req.session.user = {
    id: req.session.id,
    guest: true,
    host: false,
    answers: '',
  };
  await User.create({ where: { sessionId: req.session.id } });
  return res.json({ ...req.session.user, answers: [] });
  // return res.sendStatus(401);
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.sendStatus(200);
});

module.exports = authRouter;
