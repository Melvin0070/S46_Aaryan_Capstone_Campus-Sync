const express = require('express');
const app = express();
const port = 3000;

const {connectToDB, isConnected} = require("./database.js");


app.get('/status', (req, res) => {
    res.json({
        message: 'pong',
        database: isConnected() ? 'connected' : 'not connected'
    })
});

app.listen(port, async () => {
    await connectToDB();
    console.log(`🚀 server running on PORT: ${port}`);
});