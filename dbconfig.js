// var mongoose = require('mongoose');
// mongoose.connect('mongodb://mxuser:mxuser@ds139138.mlab.com:39138/mxdb');

// var db = mongoose.connection;

var config = {
  database: {
      connectionString: "mongodb://mxuser:mxuser@ds139138.mlab.com:39138/mxdb",
      databaseName: "mxdb"
  },
  debug: {
      database: {
          connectionString: "mongodb://mxuser:mxuser@ds139138.mlab.com:39138/mxdb",
          databaseName: "mxdb"
      }
  }
};

module.exports = config;