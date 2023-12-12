const express = require('express');
const mongoose = require('mongoose');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.get('/mongodb', async (req, res) => {
    try {
        // Fetching MongoDB credentials from Kubernetes Secrets
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        // Fetching DB URL from Kubernetes ConfigMap
        const dbURL = process.env.DB_URL;
        // MongoDB connection string
        const connectionString = `mongodb://${username}:${password}@${dbURL}`;
        // Connecting to MongoDB
        const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
        // You can perform MongoDB operations here if needed
        res.send('Connected to MongoDB');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error connecting to MongoDB');
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
