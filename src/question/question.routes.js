import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { uploadQuestion } from "../../middlewares/multer.upload.js";
import { addQuestion, getQuestions } from "./question.controller.js";

const api = Router()

api.post('/add',[validateJwt,isAdmin,uploadQuestion.fields([
      { name: 'opciones[0][picture]', maxCount: 1 },
      { name: 'opciones[1][picture]', maxCount: 1 },
      { name: 'opciones[2][picture]', maxCount: 1 }
    ])],addQuestion)

api.get('/get/:id',[validateJwt],getQuestions)

export default api