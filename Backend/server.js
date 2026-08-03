require('dotenv').config()
const app = require('./src/app')
const connectToDb = require('./src/config/database')

connectToDb()

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`Server is running at port: ${PORT}`)
})