const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u72uqqy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("redpositive_user").collection("user");

        // Load all user
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray()
            res.send(result);
        });

        // save a user details
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = userCollection.insertOne(user);
            res.status(200).json({
                success: true,
                message: 'Data inserted successfully',
                result,
            });
        });

        // API for delete 
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.status(200).json({
                success: true,
                message: 'Data Deleted successfully',
                result,
            });

        })
    }
    finally {

    }

}
run().catch(console.dir);


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