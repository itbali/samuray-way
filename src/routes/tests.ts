import express, {Request, Response} from "express";
import {DBType} from "../db/samuraiDB";
import {statusCodes} from "../utils/statusCodes";

export const getTestsRoute = (db: DBType) => {
	const testsRouter = express.Router()
	testsRouter.delete("/", (_req: Request, res: Response) => {
		db.splice(0, db.length)
		res.send(statusCodes.NO_CONTENT_204)
	})
	return testsRouter
}
