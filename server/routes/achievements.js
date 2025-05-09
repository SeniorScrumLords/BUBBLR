/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const { Achievements } = require('../db/index');

// get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievements.findAll();
    // console.log(achievements);
    res.json(achievements);
  } catch (err) {
    console.error('err fetching achievements', err);
    res.status(500);
  }
});

// get achievement by id
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievements.findByPk(req.params.id);
    res.json(achievement);
  } catch (err) {
    console.error('err fetching achievement', err);
    res.status(500);
  }
});

// create achievement
router.post('/', async (req, res) => {
  try {
    const newAchievement = await Achievements.create(req.body);
    res.status(201).json(newAchievement);
  } catch (err) {
    console.error('err creating achievement', err);
    res.status(500);
  }
});

// delete achievement
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Achievements.destroy({ where: { identification: req.params.id } });
    res.json(deleted);
  } catch (err) {
    console.error('err deleting achievements', err);
    res.status(500);
  }
});

module.exports = router;
