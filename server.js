const express = require('express');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser'); 

app.use(express.static('static'));

app.use(bodyParser.json());

const validPriceStatus = {
    '1': true,
    '2': true,
    '3': true
};

const validActivityStatus = {
  '1': true,
  '2': true,
  '3': true
}
  
const placeFieldType = {
    name: 'required',
    price: 'required',
    distance: 'required',
    numberOfPeople: 'required',
    activityLvl: 'required',
};
  
function validatePlace(place) {
    for (const field in placeFieldType) {
      const type = placeFieldType[field];
      if (!type) {
        delete place[field];
      } else if (type === 'required' && !place[field]) {
        return `${field} is required.`;
      }
    }
    if (!validPriceStatus[place.price])
      return `${[place].price} is not a valid price.`;
      if (!validActivityStatus[place.activityLvl])
      return `${[place].activityLvl} is not a valid activity level.`;
    return null;
}

app.get('/api/results', (req, res) => {
  const filter = {};
  if (req.query.name) filter.name = req.query.name;
  if (req.query.price) filter.price = req.query.price;
  if (req.query.distance) filter.distance = req.query.distance;
  if (req.query.numberOfPeople) filter.numberOfPeople = req.query.numberOfPeople;
  if (req.query.activityLvl) filter.activityLvl = req.query.activityLvl;

    db.collection('places').find(filter).toArray().then(places => {
      const metadata = { total_count: places.length };
      res.json({ _metadata: metadata, records: places })
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});
  
app.post('/api/results', (req, res) => {
    const newPlace = req.body;
  
    const err = validatePlace(newPlace);
    if (err) {
      res.status(422).json({ message: `Invalid request: ${err}` });
      return;
    }
  
    db.collection('places').insertOne(newPlace).then(result =>
      db.collection('places').find({ _id: result.insertedId }).limit(1).next()
    ).then(newPlace => {
      res.json(newPlace);
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});
  

let db;
MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
 db = connection.db('overbored');
 app.listen(3000, () => {
   console.log('App started on port 3000');
 });
}).catch(error => {
 console.log('ERROR:', error);
});


