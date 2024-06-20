import express from 'express';
import cors from 'cors';
import { connectToDB, isConnected } from "./database.js";

import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import dropRoutes from "./routes/dropRoutes.js";
import razorpayRoutes from './routes/razorpayRoutes.js';

const app = express();
const port = 1300;

app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
    res.json({
        message: 'pong',
        database: isConnected() ? 'connected' : 'not connected'
    });
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
app.use("/comments", commentRoutes);
app.use("/alumnis", alumniRoutes);
app.use("/drops", dropRoutes);
app.use("/razorpay", razorpayRoutes);
