const express = require('express');
const app = express();
const port = 3000;
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";

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

app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/scores", scoreRoutes);
app.use("/reports", reportRoutes);
app.use("/fees", feeRoutes);
app.use("/exams", examRoutes);
app.use("/comments", commentRoutes);
app.use("/alumnis", alumniRoutes);