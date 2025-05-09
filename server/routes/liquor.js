const express = require('express');
const liquor = express.Router();
const { LiquorCabinet } = require('../db/index')
const path = require('path');
const multer = require('multer')
const fs = require('fs');


const uploadsDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


liquor.use('/uploads', express.static(uploadsDir));

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });



liquor.get('/', (req, res) => {
  LiquorCabinet.findAll()
    .then((cabinetArray) => {


      res.status(200).send(cabinetArray)
    }).catch((err) => {
      console.error("could not return LiquorCabinet information", err)
      res.sendStatus(500)
    })
})

liquor.patch('/:id', async (req, res) => {

  LiquorCabinet.update(req.body, { where: req.params })

    .then((updatedLiquor) => {
      if (updatedLiquor[0]) {
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })

    .catch((error) => {
      console.error('Could not update liquor fill', error);
      res.sendStatus(500)
    });

})

liquor.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract liquor details from the request body
  const { name, brand, ABV, typeLiquor, date, amountLeft } = req.body;
  const imageUrl = `http://localhost:8080/api/liquor/uploads/${req.file.filename}`;

  // Save liquor information to the database
  LiquorCabinet.create({
    name,
    brand,
    ABV,
    typeLiquor,
    date,
    amountLeft,
    imageUrl,
  })
    .then((newBottle) => {
      res.status(201).send(newBottle);  // Return the created liquor bottle
    })
    .catch((err) => {
      console.error('Error saving liquor bottle:', err);
      res.sendStatus(500);  // Return a 500 status code on error
    });
});

// liquor.get('/view/:filename', (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.params.filename);
//   res.sendFile(filePath);
// });

liquor.delete('/:id', (req, res) => {
  const { id } = req.params
  LiquorCabinet.destroy({ where: { id } })
    .then((rowsDel) => {
      if (rowsDel) {
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
    .catch((err) => {
      console.error("Could not destory based on liqyor bottle ID", err)
      res.sendStatus(500)

    })
})

liquor.use('/uploads', express.static('uploads'));


module.exports = liquor