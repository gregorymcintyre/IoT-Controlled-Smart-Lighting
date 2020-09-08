const port = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gmcintyre:7bQv6jD28SKKqxz0@cluster0.e4puu.mongodb.net/lights?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/api/test', (req, res) => {
	res.send('The API is working!');
    });

app.listen(port, () => {
	console.log(`listening on port ${port}`);
    });
