import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import router from "./routers/index.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
var app = express();
dotenv.config();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Running on ".concat(port));
});
