const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const env = require('./env');
const UsersRoute = require('./app/routes/userRoute');
const AdminsRoute = require('./app/routes/adminRoute');
const dbConnect = require('./app/db/dbConnection');
const morgan = require('morgan');

//don't show the log when it is test
if(env.environment !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', UsersRoute);
app.use('/api/v1', AdminsRoute);


app.listen(env.port).on('listening', () => {
  console.log('🚀 are live on ' + env.port);
});


module.exports = app;
