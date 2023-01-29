require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// SECURITY PACKAGES
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const ratelimit = require('express-rate-limit')

// SECURITY PACKAGES

const authrouter = require('./routes/auth')
const jobrouter = require('./routes/jobs')
const connectionDB = require('./db/connect')
const authmiddleware = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// SECURITY
app.set('trust proxy', 1)
app.use(ratelimit({

  windowMs:15 * 60 * 1000,  //15 minutes
  max:100, // limit each ip to 100 requests per windowMs
}))

app.use(helmet())
app.use(cors())
app.use(xss())





// SECURITY





// routes
// app.get('/', (req, res) => {
//   res.send('jobs api');
// });

app.use('/api/v1/auth', authrouter)
app.use('/api/v1/jobs', authmiddleware, jobrouter)








app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {

    await connectionDB(process.env.mongoose_connection)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
