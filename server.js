require('dotenv').config();
const auth = require('./auth.js');
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use('/auth', auth.routes);
installHandler(app);

const port = process.env.PORT || 3000;

(async function () {
  try {
    await connectToDb();
    app.listen(port, function () {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());