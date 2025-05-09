const { LiquorCabinet } = require('./index.js')
LiquorCabinet.destroy({
  where: {}, truncate: true
})
  .then(() => console.log('Data removed from LiquorCabinet'))
  .catch((err) => console.error('propblem removing data from LiquorCabinet', err))
LiquorCabinet.bulkCreate([
  {
    userId: 1,
    imageUrl: 'https://thesageapron.com/wp-content/uploads/2022/03/Hibiscus-Rum-Punch.jpg',
    name: "Crystal",
    brand: 'Don Q',
    typeLiquor: 'rum',
    ABV: 45.0,
    amountLeft: 100.0,
    notes: "great rum for mixed drinks",
    date: '2015-02-09 18:05:28.989 +00:00'
  },
  {
    userId: 1,
    imageUrl: 'https://images.rumratings.com/uploads/media/file_name/15209/large_3E93C0E6-836B-48E9-B9C6-260A09AC7E8D.jpeg',
    name: "Hibiscus Rum",
    brand: '504',
    typeLiquor: 'rum',
    ABV: 41.1,
    amountLeft: 100.0,
    notes: "great rum for mixed drinks",
    date: '2023-02-09 18:05:28.989 +00:00'
  },
], { ignoreDuplicates: true })
  .then(() => { console.log('seed data inserted') })
  .catch((err) => {
    console.error('Problem adding seed data', err)
  })