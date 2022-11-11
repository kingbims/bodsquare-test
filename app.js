const app = require('./src/startup/routes')
const http = require('http').createServer(app)
const db = require('./src/startup/db')
const port = process.env.port || 5000

http.listen(port, () => {
    console.log(`server starting on port: ${port}`)
})