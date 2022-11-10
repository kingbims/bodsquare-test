const express = require('express')
const cors = require('cors')
const error = require('../middlewares/error')
const { loggerMiddleware } = require('../middlewares/logger')

const app = express()
const corsOptions = {
    origin: '*',
    exposedHeaders: ['x-auth-token'],
};

//Route files
const auth = require('../routes/auth.route')
const user = require('../routes/user.route')
const task = require('../routes/task.route')

//Swagger files
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger-output.json')

//Swagger for API documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


app.use(loggerMiddleware)

//Routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)
app.use('/api/v1/task', task)
app.use(error)


// Default landing endpoint
app.use('/', (req, res, next) => res.status(200).json({ message: 'Welcome to This-APP.' }));

module.exports = app;