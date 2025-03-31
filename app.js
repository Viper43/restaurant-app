// node modules
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

// app modules
const testRoute = require('./routes/testRoutes')
const categories = require('./routes/categories')
const authRoute = require('./routes/authRoute')
const dbConnection = require('./config/db');

// dotenv config
dotenv.config()

// db connection
dbConnection()

// express object
const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))


// port
const port = process.env.port || 5000

// routes
app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth', authRoute)

app.get('/test', (req, res) => {
    res.send("api 1");
    res.end();
});

// listen
app.listen(port, () => {
    console.log('listening to port ', port);
})

