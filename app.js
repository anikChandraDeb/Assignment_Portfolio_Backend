//import applications all packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from 'mongoose';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import * as path from "path";
import router from "./routes/api.js";
import { MONGODB_CONNECTION,PORT,MAX_JSON_SIZE,URL_ENCODER,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME } from "./app/config/config.js";
import fileUpload from "express-fileupload";
import { lutimes } from "fs";

const app = express();
//Global Application Middleware
// app.use(cors());
app.use(cors({
    origin: {
        'http://localhost:5173':true,
        }, // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,  //  If using cookies/auth
}));
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODER}));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());
app.use(fileUpload());

// app.use(fileupload({
//     limits: {fileSize: 50*1024*1024}
// }));

//Rate Limiter
const limiter = rateLimit({windowMs: REQUEST_LIMIT_TIME,max: REQUEST_LIMIT_NUMBER});
app.use(limiter);

//Web Caching Mechanism
app.set('etag',WEB_CACHE);

//MongoDB Connection
mongoose.connect(MONGODB_CONNECTION)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((error)=>{
    console.log(error);
});

//Set API Route
app.use('/api',router);

//Set Application Storage
app.use(express.static('storage'));

//Run Your Express Backend Project
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
});