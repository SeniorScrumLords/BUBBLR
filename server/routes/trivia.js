/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
const { Trivia } = require('../db/index');

const router = express.Router();

// fetch trivia questions
router.get('/', async (req, res) => {
  try {
    const questions = await Trivia.findAll();
    res.json(questions);
  } catch (err) {
    console.error('err fetching trivia questions', err);
    res.status(500);
  }
});

module.exports = router;
