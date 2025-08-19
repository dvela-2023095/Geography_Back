//Esto es para cuando se requiera alguna validacion personalizada

import { body } from "express-validator";
import { existsUser } from "../utils/db.validators.js";
import { validateErrorsWhitoutFiles, } from "./validate.errors.js";

export const userValidator =[
    body('username','Username is required').notEmpty().isLength({min:3,max:10}).custom(existsUser),
    body('password','Password is required').notEmpty().isLength({min:8,max:12}).isStrongPassword(),
    validateErrorsWhitoutFiles
]