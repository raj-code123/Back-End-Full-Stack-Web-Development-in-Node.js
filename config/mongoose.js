const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open',function(){
    console.log("connected to Database :: MongoDb");
});

module.exports = db;