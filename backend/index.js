require('dotenv').config()

const app = require('./app')

// const PORT = process.env.PORT

app.listen(3000, () => {
    console.log(`APP IS RUNNING AT http://localhost:3000`)
})
