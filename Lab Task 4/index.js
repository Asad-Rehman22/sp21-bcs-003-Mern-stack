// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;


const uri = 'mongodb://localhost:27017/nhb';


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


MongoClient.connect(uri)
  .then((client) => {
    console.log('Connected to local MongoDB server');


    const db = client.db('nhb');
    const collection = db.collection('name');

    
    app.set('view engine', 'ejs');

   
    app.get('/', async (req, res) => {
      try {
        const data = await collection.find().toArray();
        res.render('index', { data });
      } catch (error) {
        console.error('Error querying MongoDB:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    
    app.get('/products/new', (req, res) => {
      res.render('form', { product: {}, errors: [] });
    });

    app.post('/products', [
      check('name').notEmpty().withMessage('Name is required'),
      check('price').isNumeric().withMessage('Price must be a number'),
    ], async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render('form', { product: req.body, errors: errors.array() });
      }

      const { name, price } = req.body;

      try {
        await collection.insertOne({ name, price: parseFloat(price) });
        res.redirect('/');
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).send('Internal Server Error');
      }
    });

   
    app.get('/products/:id/edit', async (req, res) => {
      const productId = req.params.id;

      try {
        const product = await collection.findOne({ _id: ObjectId(productId) });
        res.render('form', { product, errors: [] });
      } catch (error) {
        console.error('Error querying MongoDB:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.post('/products/:id', [
      check('name').notEmpty().withMessage('Name is required'),
      check('price').isNumeric().withMessage('Price must be a number'),
    ], async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render('form', { product: req.body, errors: errors.array() });
      }

      const productId = req.params.id;
      const { name, price } = req.body;

      try {
        await collection.updateOne({ _id: ObjectId(productId) }, { $set: { name, price: parseFloat(price) } });
        res.redirect('/');
      } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).send('Internal Server Error');
      }
    });


    app.post('/products/:id/delete', async (req, res) => {
      const productId = req.params.id;

      try {
        await collection.deleteOne({ _id: ObjectId(productId) });
        res.redirect('/');
      } catch (error) {
        console.error('Error deleting data in MongoDB:', error);
        res.status(500).send('Internal Server Error');
      }
    });

  
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to local MongoDB server:', err);
  });
