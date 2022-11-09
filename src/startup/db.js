const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

const DB = process.env.MONGO_URL

// connection to the database

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('DB connected successfully')
}).catch(err => {
    console.log('DB connection failed', err)
})