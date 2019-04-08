const express = require('express');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');                        

app.use(express.static('static'));

app.use(bodyParser.json());

const validPlaceStatus = {
    name: true,
    price: true,
    distance: true,
    numberOfPeople: true,
    activityLvl: true,
};
  
const placeFieldType = {
    name: 'required',
    price: 'required',
    distance: 'required',
    numberOfPeople: 'required',
    activityLvl: 'required',
};
  
function validatePlace(place) {
    for (const field in placeFieldType) {
      const type = [placeFieldType][field];
      if (!type) {
        delete place[field];
      } else if (type === 'required' && !place[field]) {
        return `${field} is required.`;
      }
    }
    if (!validPlaceStatus[place.status])
      return `${[place].status} is not a valid status.`;
    return null;
}

app.get('api/results.html', (req, res) => {
    db.collection('places').find().toArray().then(places => {
      const metadata = { total_count: places.length };
      res.json({ _metadata: metadata, records: places })
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});
  
app.post('api/results.html', (req, res) => {
    const newPlace = req.body;
    newPlace.created = new Date();
  
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


