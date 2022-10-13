const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()

const port = process.send.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

//base url
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'server is running'
    })
})

//creating server
app.listen(port, () => {
    console.log("listening to the port", port)
})