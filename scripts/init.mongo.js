var db = new Mongo().getDB("overbored");
db.places.insert({name: "Blue Wall", price:"2", distance:"0", numberOfPeople:"11", activityLvl:"1"});
db.places.insert({name: "Rec Center", price: "1", distance: "0", numberOfPeople: "11", activityLvl: "3"});
db.places.insert({name: "Cinemark Movie Theater", price: "2", distance: "3", numberOfPeople: "11", activityLvl: "1"});
db.places.insert({name: "Central Rock Gym", price: "3", distance: "5", numberOfPeople:"11", activityLvl: "3"});
db.places.insert({name: "Mt. Tom", price: "1", distance: "14", numberOfPeople: "11", activityLvl: "3"});
db.places.insert({name: "Pinz", price: "2", distance: "3", numberOfPeople: "6", activityLvl: "2"});