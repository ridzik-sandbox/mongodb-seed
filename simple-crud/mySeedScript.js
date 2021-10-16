/* mySeedScript.js 
Adjusted from original script provided under template/mySeedScript.js (which didn't work)
Seeds DB on Mongo Atlas
Uses dotenv and library that uses crypto-js to decrypt the env values for authentication

If Error: MongoServerSelectionError: connection <monitor> to 54.174.213.75:27017 closed
Refresh Whitelist IP in MongoDB Atlas
*/

// require the necessary libraries
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const crypto = require("./shared/crypto");

const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const {
    MONGODB_CLUSTER,
    MONGODB_DB,
    MONGODB_USER,
    MONGODB_PW,
    } = process.env;

const cluster = crypto.decrypt(MONGODB_CLUSTER);
const db = crypto.decrypt(MONGODB_DB);
const un = crypto.decrypt(MONGODB_USER);
const pw = crypto.decrypt(MONGODB_PW);

// Connection URL
const uri = `mongodb+srv://${un}:${pw}@${cluster}.ltcno.mongodb.net/${db}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function seedDB() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("simpleCrud").collection("cats");

        // The deleteMany() command destroys all data from a collection. It does not remove the db or collection, just documents.
        // Make sure you run it against proper database and collection.
        collection.deleteMany();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5000; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            let newDay = {
                timestamp_day: faker.date.past(),
                cat: faker.random.word(),
                owner: {
                    email: faker.internet.email(firstName, lastName),
                    firstName,
                    lastName,
                },
                events: [],
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
                newDay.events.push(newEvent);
            }
            timeSeriesData.push(newDay);
        }
        collection.insertMany(timeSeriesData, () => {
            console.log("Closing DB connection");
            client.close();
        });

        console.log("Database seeded! :)");
    } catch (err) {
        console.log(err.stack);
    }
}
seedDB().catch(console.dir);