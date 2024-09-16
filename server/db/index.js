const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bubblr', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// User model
const User = sequelize.define('User', {
  googleId: { type: DataTypes.STRING, allowNull: false, unique: true },
  nameFirst: DataTypes.STRING,
  nameLast: DataTypes.STRING,
  email: DataTypes.STRING,
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

User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Event.belongsToMany(Bar, { through: 'EventBars' });
Bar.belongsToMany(Event, { through: 'EventBars' });

sequelize.sync({ alter: true })
  .then(() => console.log('synced'))
  .catch((err) => console.error('Error syncing', err));

User.sync()
  .catch((err) => console.error(err));

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

UserFriends.sync()
  .catch((err) => console.error('Failed syncing UserFriends: ', err));

  const customDrinks = sequelize.define('customDrinks', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
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
        this.setDataValue("drinkMeasurements", JSON.stringify(val ?? ""));
     },
    },
  })

  customDrinks.sync()
    .catch((err) => console.error('Failed syncing customDrinks: ', err));

    const estDrinks = sequelize.define('estDrinks', {
      drinkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.STRING
      }
    })

    estDrinks.sync()
      .catch((err) => console.error('Failed syncing estDrinks: ', err));
 
module.exports = {
  User,
  Event,
  Bar,
  UserFriends,
  customDrinks,
  estDrinks,
};
