import { initServer } from "../../BDTareas/configs/app.js"
import {config} from 'dotenv'
import { connect } from "./config/mongo.js"
config()
connect()
initServer()