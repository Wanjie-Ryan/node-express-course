require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authrouter = require('./routes/auth')
const jobrouter = require('./routes/jobs')
const connectionDB = require('./db/connect')
const authmiddleware = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

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
