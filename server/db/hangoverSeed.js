const {
  Hangover,
  Symptom,
  PastDrink,
  // PastMixer,
  PastFood,
} = require('./index');

// const models = [Hangover, Symptom, PastDrink, PastMixer, PastFood];

const hangoverData = [
  {
    name: 'Sunrise over Big Daddys',
    day: '2025-02-25 08:00:00',
    additional: false,
  },
  {
    name: 'Happy birthday, Jenna',
    day: '2025-03-01 08:00:00',
    additional: true,
    notes: 'skittles and pop-rocks',
  },
  {
    name: 'Mardi Gras!!',
    day: '2025-03-04 08:00:00',
    additional: true,
    notes: 'tabs and spacebars',
  },
];

const symptomData = [
  {
    name: 'headache',
    severity: 4,
    duration: 3,
  },
  {
    name: 'nausea',
    severity: 6,
    duration: 5,
  },
  {
    name: 'sweats',
    severity: 2,
    duration: 2,
  },
  {
    name: 'Shakes',
    severity: 3,
    duration: 2,
  },
  {
    name: 'headache',
    severity: 8,
    duration: 4,
  },
  {
    name: 'nausea',
    severity: 6,
    duration: 7,
  },
  {
    name: 'headache',
    severity: 11,
    duration: 4,
  },
  {
    name: 'nausea',
    severity: 5,
    duration: 10,
  },
  {
    name: 'depression',
    severity: 4,
    duration: 12,
  },
  {
    name: 'light sensitivity',
    severity: 9,
    duration: 8,
  },
];

const pastDrinkData = [
  {
    name: 'tequila',
    shots: 5,
    timeSpan: 4, // timeSpan will be in hours
    hangRef: 1,
  },
  {
    name: 'rum',
    shots: 3,
    timeSpan: 4,
    hangRef: 1,
  },
  {
    name: 'tequila',
    timeSpan: 10,
    shots: 5,
    hangRef: 2,
  },
  {
    name: 'red wine',
    shots: 3, // I guess for wine, it will be by glasses
    timeSpan: 5,
    hangRef: 2,
  },
  {
    name: 'tequila',
    shots: 14,
    timeSpan: 12,
    hangRef: 3,
  },
  {
    name: 'rum',
    shots: 4,
    timeSpan: 12,
    hangRef: 3,
  },
  {
    name: 'everclear',
    shots: 3,
    timeSpan: 12,
    hangRef: 3,
  },
];

const pastFoodData = [
  {
    name: 'shrimp po-boy',
    hangRef: 1,
  },
  {
    name: 'cake',
    hangRef: 2,
  },
  {
    name: 'cake',
    hangRef: 3,
  },
  {
    name: 'fried chicken',
    hangRef: 3,
  },
];

// const seeds = [
//   hangoverData,
//   symptomData,
//   pastDrinkData,
//   pastMixerData,
//   pastFoodData,
// ];

// const seedDb = (model, array) => {
//   model
//     .destroy({
//       where: {},
//     })
//     .then(() => console.log(`${model} successfully destroyed`))
//     .then(() => {
//       model.bulkCreate(array, { ignoreDuplicates: true });
//     })
//     .catch((err) => console.error('failed to seed table', err));
// };

// const seedAll = (modArr) => {
//   modArr.forEach((mod, i) => {
//     seedDb(mod, seeds[i]);
//   });
// };
// seedAll(models);

/**
 * addSymptoms
 * return Hangover.findOne ({where: {name: 'Sunrise over Big Daddys'}})
 * .then((data) => {
 * hangover = data;
 * return Symptom.findAll({where: {hangRef: 1}})
 * }).then((data) => {
 * symptoms = data;
 * Hangover.addSymptoms()
 * }).catch((err) => console.error(err));
 *
 * addPastDrinks
 * addPastFoods
 */

const seedHangovers = () => {
  Hangover.destroy({
    where: {},
  })
    .then(() => console.log('Hangovers successfully destroyed'))
    .then(() => {
      Hangover.create({
        name: 'Sunrise over Big Daddys',
        day: '2025-02-25 08:00:00',
        pastWater: 3,
        additional: false,
      });
      // Hangover.bulkCreate(hangoverData, { ignoreDuplicates: true });
    })
    .then(() => Hangover.findAll({ where: {} }))
    .then((hangover) => {
      console.log('Big Daddy created', hangover);
      return hangover.createSymptom(symptomData[0]);
    })
    .catch((err) => console.error('failed to seed Hangovers', err));
};
// const seedSymptoms = () => {
//   Symptom.destroy({
//     where: {},
//   })
//     .then(() => console.log('Symptoms successfully destroyed'))
//     .then(() => {
//       Symptom.bulkCreate(symptomData, { ignoreDuplicates: true });
//     })
//     .catch((err) => console.error('failed to seed Symptoms', err));
// };
const seedPastDrinks = () => {
  PastDrink.destroy({
    where: {},
  })
    .then(() => console.log('PastDrinks successfully destroyed'))
    .then(() => {
      PastDrink.bulkCreate(pastDrinkData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastDrinks', err));
};
const seedPastFoods = () => {
  PastFood.destroy({
    where: {},
  })
    .then(() => console.log('PastFoods successfully destroyed'))
    .then(() => {
      PastFood.bulkCreate(pastFoodData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastFoods', err));
};

// seedHangovers();
// seedSymptoms();
// seedPastDrinks();
// seedPastFoods();
