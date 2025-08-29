// index.js
import { initServer } from "../Geography_Back/config/app.js";
import { config } from "dotenv";
import { connect } from "./config/mongo.js";

config()
connect()
initServer()
