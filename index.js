const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('listening to ', port);
})

app.get('/', (req, res) => {
  res.send('Toy Nirvana Api server running....');
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@crud-practice.heeny6h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/toys', async (req, res) => {
  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.find({}).limit(20).toArray();

  res.send(result);

})

app.get('/category/:subCategory', async (req, res) => {
  const query = { sub_category: req.params.subCategory }
  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.find(query).toArray();

  res.send(result);

})

app.get('/toy/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.findOne(query);

  res.send(result);

})

app.post('/addToy', async (req, res) => {
  const newToy = req.body;
  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.insertOne(newToy);

  res.send(result);

})

app.get('/toys/:email', async (req, res) => {
  const query = { seller_email: req.params.email }
  const sortValue=parseInt(req.query.sortOrder);
  let sortQuery;
  if(sortValue===1 || sortValue===-1){
    sortQuery={price: req.query.sortOrder};
  } else sortQuery={};
    
  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.find(query).sort(sortQuery).toArray();

  res.send(result);

})

app.delete('/toy/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.deleteOne(query);

  res.send(result);

})

app.patch('/toy/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updateDoc = { $set: req.body };

  const collection = await client.db('ToyNirvana').collection('toys');

  const result = await collection.updateOne(query, updateDoc);

  res.send(result);

})

module.exports = app;