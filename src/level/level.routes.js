import { Router } from "express";
import { addLevel, getLevels } from "./level.controller.js";
import { levelValidator } from "../../middlewares/validations.js";
import { uploadLevels } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";

const api = Router()

api.get('/list', getLevels)
api.post('/add',[uploadLevels.fields([{ name: 'flag', maxCount: 1 },{ name: 'levelImage', maxCount: 1 }]),levelValidator, deleteFileOnError],addLevel)


export default api
