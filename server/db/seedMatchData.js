const { User, MatchGame } = require('./index');

async function clearDatabase() {
  await MatchGame.destroy({ where: {} });
  await User.destroy({ where: {} });
  console.log('Database cleared');
}

async function seedUsers() {
  const usersData = [
    { googleId: 'user1_google', email: 'user1@example.com' },
    { googleId: 'user2_google', email: 'user2@example.com' },
    { googleId: 'user3_google', email: 'user3@example.com' },
  ];

  const users = await User.bulkCreate(usersData, { returning: true });
  console.log('Users seeded');
  return users;
}

async function seedMatchGames() {
  await clearDatabase(); // Ensure fresh data before seeding

  const users = await seedUsers(); // Ensure Users exist before inserting MatchGames

  const matchGamesData = [
    {
      userId: users[0].id,
      drinkId: 1,
      imageUrl:
        'https://img.freepik.com/free-psd/refreshing-iced-tea-drink-with-mint-garnish-two-straws-tall-glass_632498-52446.jpg',
    },
    {
      userId: users[0].id,
      drinkId: 2,
      imageUrl:
        'https://img.freepik.com/free-psd/refreshing-ice-cold-cola-drink-glass-with-splash_632498-25634.jpg',
    },
    {
      userId: users[1].id,
      drinkId: 3,
      imageUrl:
        'https://img.freepik.com/free-psd/refreshing-mojito-cocktail-glass-with-lemon-ice-cubes-transparent-background_84443-26917.jpg',
    },
    {
      userId: users[1].id,
      drinkId: 4,
      imageUrl:
        'https://png.pngtree.com/element_pic/17/01/09/bfa7e3de2a4bfbdce23368445883c182.jpg',
    },
    {
      userId: users[2].id,
      drinkId: 1,
      imageUrl: 'https://freepng.pictures/get-logo.php?id=31000',
    },
    {
      userId: users[2].id,
      drinkId: 4,
      imageUrl:
        'https://png.pngtree.com/element_our/20190523/ourmid/pngtree-simple-cartoon-summer-drink-png-material-image_1087193.jpg',
    },
  ];

  await MatchGame.bulkCreate(matchGamesData);
  console.log('MatchGames seeded');
}

seedMatchGames().catch(console.error);
