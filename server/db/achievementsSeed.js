/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const { Achievements } = require('./index');

const achievementsData = [
  {
    name: 'Bottoms Up!',
    description: 'Logged your first drink',
    achievementType: 'milestone',
    badgeImage: 'https://google.com/badge1.jpg',
  },
  {
    name: 'Mixologist',
    description: 'Created 5 custom drinks',
    achievementType: 'creation',
    badgeImage: 'https://google.com/badge2.jpg',
  },
];

const seedAchievements = async () => {
  try {
    await Achievements.destroy({ where: {} });
    console.log('old achievements deleted');
    await Achievements.bulkCreate(achievementsData, { ignoreDuplicates: true });
    console.log('achievements seeded');
  } catch (err) {
    console.error('err seeding achievements', err);
  }
};

seedAchievements();
