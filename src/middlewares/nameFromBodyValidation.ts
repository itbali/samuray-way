import {body} from "express-validator";

export const nameFromBodyValidation = body("name").trim().isLength({min: 3, max: 300});
