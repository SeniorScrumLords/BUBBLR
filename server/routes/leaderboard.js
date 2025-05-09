/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
const { User, Leaderboard } = require('../db/index');

const router = express.Router();

// router.post('/', async (req, res) => {
//   const { googleId, score } = req.body;
//   try {
//     const [user, created] = await User.findOrCreate({
//       where: { googleId },
//       defaults: { nameFirst: '', nameLast: '', email: '' },
//     });
//     const leaderboard = await Leaderboard.findOne({ where: { userId: user.id } });
//     if (leaderboard) {
//       leaderboard.score = score;
//       await leaderboard.save();
//     } else {
//       await Leaderboard.create({ userId: user.id, score });
//     }

//     res.status(200).json({ message: 'score submitted successfully' });
//   } catch (err) {
//     console.error('err submitting score', err);
//     res.status(500);
//   }
// });

router.post('/', async (req, res) => {
  const { googleId, score } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { googleId },
      defaults: { nameFirst: '', nameLast: '', email: '' },
    });
    await Leaderboard.create({ userId: user.id, score });
    res.status(200).json({ message: 'score submitted successfully' });
  } catch (err) {
    console.error('err submitting score:', err);
    res.status(500);
  }
});

// router.get('/top-scores', async (req, res) => {
//   try {
//     const leaderboard = await Leaderboard.findAll({
//       order: [['score', 'DESC']],
//       limit: 10,
//       include: {
//         model: User,
//         attributes: ['nameFirst', 'nameLast'],
//       },
//     });

//     res.status(200).json(leaderboard);
//   } catch (err) {
//     console.error('err fetching leaderboard', err);
//     res.status(500);
//   }
// });

router.get('/top-scores', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findAll({
      order: [['score', 'DESC']],
      limit: 10,
      include: {
        model: User,
        attributes: ['nameFirst', 'nameLast', 'avatar'],
      },
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error('err fetching leaderboard', err);
    res.status(500);
  }
});

module.exports = router;
