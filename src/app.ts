import express from "express";
import {samurais} from "./db/samuraiDB";
import {samuraisRoutes} from "./routes/samurais";
import {getTestsRoute} from "./routes/tests";
import bodyParser from "body-parser";

export const app = express()
app.use(bodyParser.json())

const testsRoute = getTestsRoute(samurais)
app.use("/samurais", samuraisRoutes)
app.use("/__test__", testsRoute)


