const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bubblr', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// User model
// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   googleId: { type: DataTypes.STRING, allowNull: false, unique: true },
//   nameFirst: DataTypes.STRING,
//   nameLast: DataTypes.STRING,
//   email: DataTypes.STRING,
// });

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nameFirst: DataTypes.STRING,
  nameLast: DataTypes.STRING,
  email: DataTypes.STRING,
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "/avatars/avatar1.png",
  },
});

// User friends model
const UserFriends = sequelize.define('UserFriends', {
  friend1Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  friend2Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Event model
const Event = sequelize.define('Event', {
  name: { type: DataTypes.STRING, allowNull: false },
});

// Bar model
const Bar = sequelize.define('Bar', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zipcode: DataTypes.STRING,
});

// Custom drinks model
const customDrinks = sequelize.define('customDrinks', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  drinkName: {
    type: DataTypes.STRING,
  },
  drinkCategory: {
    type: DataTypes.STRING,
  },
  alcoholicDrink: {
    type: DataTypes.STRING,
  },
  drinkGlass: {
    type: DataTypes.STRING,
  },
  drinkInstructions: {
    type: DataTypes.TEXT,
  },
  drinkIngredients: {
    type: DataTypes.STRING,
  },
  drinkMeasurements: {
    type: DataTypes.STRING,
    set(val) {
      this.setDataValue('drinkMeasurements', JSON.stringify(val ?? ''));
    },
  },
});

// estDrinks model
const estDrinks = sequelize.define('estDrinks', {
  drinkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  drinkName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  drinkCategory: {
    type: DataTypes.STRING,
  },
  alcoholicDrink: {
    type: DataTypes.STRING,
  },
  drinkGlass: {
    type: DataTypes.STRING,
  },
  drinkInstructions: {
    type: DataTypes.TEXT,
  },
  drinkIngredients: {
    type: DataTypes.JSON,
  },
  drinkImage: {
    type: DataTypes.STRING,
  },
});

// Comment model
const Comment = sequelize.define('Comment', {
  drinkId: {
    type: DataTypes.INTEGER,
    references: {
      model: estDrinks,
      key: 'drinkId',
    },
  },
  comment: {
    type: DataTypes.TEXT,
  },
});

// Rating model
const Rating = sequelize.define('Rating', {
  drinkId: {
    type: DataTypes.INTEGER,
    references: {
      model: estDrinks,
      key: 'drinkId',
    },
  },
  rating: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 5,
    },
  },
});

// Match Game model
const MatchGame = sequelize.define('MatchGame', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  drinkId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, // Stores user-uploaded image (Cloudinary URL)
  },
});

// Achievement model
const Achievements = sequelize.define('Achievements', {
  identification: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  achievementType: {
    type: DataTypes.STRING,
  },
  badgeImage: {
    type: DataTypes.STRING,
  },
});

// User Achievements model
const UserAchievements = sequelize.define(
  'UserAchievements',
  {
    userIdentification: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    achievementData: {
      type: DataTypes.INTEGER,
      references: {
        model: Achievements,
        key: 'identification',
      },
    },
    unlockedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

const LiquorCabinet = sequelize.define('LiquorCabinet', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  typeLiquor: {
    type: DataTypes.STRING,
  },
  ABV: {
    type: DataTypes.FLOAT,
  },
  amountLeft: {
    type: DataTypes.FLOAT,
    defaultValue: 100.0,
  },
  notes: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

const Hangover = sequelize.define('Hangovers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  hangoverName: {
    type: DataTypes.STRING,
  },
  hangoverDate: {
    type: DataTypes.DATE,
  },
  addSub: {
    type: DataTypes.BOOLEAN,
  },
  hangoverNote: {
    type: DataTypes.STRING,
  },

})
const Symptom = sequelize.define('Symptoms', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  severity: {
    type: DataTypes.INTEGER,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
})
const PastDrink = sequelize.define('PastDrinks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  shots: {
    type: DataTypes.INTEGER,
    require: true,
  },
  timeSpan: {
    type: DataTypes.INTEGER,
  },
})
const PastFood = sequelize.define('PastFoods', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
})

const Trivia = sequelize.define('Trivia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question: {
    type: DataTypes.STRING,
    allowNull: true
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING
  },
});

  const Leaderboard = sequelize.define('Leaderboard', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
  }, {
    timestamps: true,
  });




// Model associations
User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Event.belongsToMany(Bar, { through: 'EventBars' });
Bar.belongsToMany(Event, { through: 'EventBars' });

User.belongsToMany(Achievements, { through: UserAchievements });
Achievements.belongsToMany(User, { through: UserAchievements });

Hangover.hasMany(PastDrink, { allowNull: false, as: 'pastDrinks' });
PastDrink.belongsTo(Hangover, { foreignKey: 'id', as: 'hangover' });

Hangover.hasMany(PastFood, { allowNull: false, as: 'pastFoods' });
PastFood.belongsTo(Hangover, { foreignKey: 'id', as: 'hangover' });

Hangover.hasMany(Symptom, { allowNull: false, as: 'symptoms' });
Symptom.belongsTo(Hangover, { foreignKey: 'id', as: 'hangover' });

User.hasMany(Hangover, {  allowNull: true, as: 'hangovers' });
Hangover.belongsTo(User, { foreignKey: 'id', as: 'user' });

User.hasMany(Leaderboard, { foreignKey: 'userId' });
Leaderboard.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ alter: true })
  .then(() => console.log('synced'))
  .catch((err) => console.error('Error syncing', err));

// Sync models
// User.sync().catch((err) => console.error(err));
// UserFriends.sync().catch((err) => console.error('Failed syncing UserFriends: ', err));
// customDrinks.sync().catch((err) => console.error('Failed syncing customDrinks: ', err));
// estDrinks.sync().catch((err) => console.error('Failed syncing estDrinks: ', err));
// Comment.sync().catch((err) => console.error('Failed syncing Comment:', err));
// Rating.sync().catch((err) => console.error('Failed syncing Rating:', err));
// MatchGame.sync().catch((err) => console.error('Failed syncing MatchGame:', err));
// Achievements.sync().catch((err) => console.error('Failed syncing Achievements:', err));
// UserAchievements.sync().catch((err) => console.error('Failed syncing UserAchievements:', err));
// UserAchievements.sync().catch((err) => console.error('Failed syncing UserAchievements:', err));
// LiquorCabinet.sync().catch((err) => console.error('Failed syncing LiquorCabinet:', err));-----

module.exports = {
  User,
  Event,
  Bar,
  UserFriends,
  customDrinks,
  estDrinks,
  Comment,
  Rating,
  MatchGame,
  Achievements,
  UserAchievements,
  LiquorCabinet,
  Hangover,
  PastDrink,
  PastFood,
  // PastMixer,
  Symptom,
  Trivia,
  Leaderboard,
};
