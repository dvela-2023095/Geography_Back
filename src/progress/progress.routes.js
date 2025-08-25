import { Router } from "express";
import { addProgress, getProgressByUser, updateProgress } from "../progress/progress.controller.js";

const api = Router()

api.post('/add', addProgress)
api.get('/byUser/:id', getProgressByUser)
api.put('/update/:id', updateProgress)

export default api