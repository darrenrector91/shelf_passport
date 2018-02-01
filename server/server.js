const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

// start up the mongo database
require('./modules/database');
const passport = require('./strategies/user.strategy');

// Route includes

const userRouter = require('./routes/user.router');
const dataRouter = require('./routes/data.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
console.log('after credential verification the session is spun up and the user is ready to go');

app.use(passport.initialize());
app.use(passport.session());

/* Routes */
console.log('after subitting the username and pwrd the user is redirected by the route to the encrytion for salting and hashing of the password');

app.use('/api/user', userRouter);
app.use('/api/data', dataRouter);

// Serve static files
app.use(express.static('server/public'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
