//Esto es para cuando se requiera alguna validacion personalizada

import { body } from "express-validator";
import { existsLevel, existsUser } from "../utils/db.validators.js";
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.errors.js";

export const userValidator =[
    body('username','Username is required').notEmpty().isLength({min:3,max:10}).custom(existsUser),
    body('password','Password is required').notEmpty().isLength({min:8,max:12}).isStrongPassword(),
    validateErrorsWhitoutFiles
]

export const levelValidator = [
    body('name', 'Name is required').notEmpty().isLength({min: 4, max:56}).custom(existsLevel),
    validateErrors
]