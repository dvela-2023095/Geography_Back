import { Router } from "express";
import { addProgress, getProgressByUser, updateProgress } from "../progress/progress.controller.js";
import { validateJwt } from "../../middlewares/validateJwt.js";


const api = Router()

api.post('/add', addProgress)
api.get('/byUser/:id', getProgressByUser)
api.put('/update',[validateJwt], updateProgress)

export default api