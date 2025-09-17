// Middleware to parse cookies in HTTP requests{req.cookies}
import cookieParser from "cookie-parser";
//Core framework to build server and APIs.
import express from "express";
// Cors enables Cross-Origin Resource Sharing. With cors - frontend can safely access backend
import cors from "cors";
//Secure HTTP headers from XSS,clickjacking attack.
import helmet from "helmet";
//Protects from HTTP Parameter Pollution
import hpp from "hpp"
//Middleware to limit number of request
import rateLimit from "express-rate-limit";
import router from "./routes/api.js"
const app = express();
//ODM(Object data modeling) library--interact with MongoDB using schemas/models
import mongoose from "mongoose";
import {PORT} from "./src/config/config.js"
//Node.js built-in module to work with file paths
import * as path from "node:path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();
// Security Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp());

//Parsing
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true, limit: "5mb"}));

//Rate Limiter
const limiter = rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 1000 // Limit each IP to 1000 requests per 15 min
})

app.use(limiter);
app.set('etag', false)

app.use('/api/v1', router);





// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');

    // Start server **only after MongoDB connects**
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((err) => {
    console.error('MongoDB connection failed:', err);
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, "react-Frontend", "dist")));


// Catch-all for React frontend (Express v5 compatible)
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "react-Frontend", "dist", "index.html"));
});


export default app;
