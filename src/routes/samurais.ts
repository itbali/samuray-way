import express, {Request, Response} from "express";
import {DeleteSamuraiReqParamsDTO, DeleteSamuraiResDTO} from "../dto/DeleteSamuraiDTO";
import {GetSamuraiReqParamsDTO, GetSamuraiResDTO} from "../dto/GetSamuraiDTO";
import {GetSamuraisQueryDTO} from "../dto/GetSamuraisDTO";
import {PostSamuraiReqDTO, PostSamuraiResDTO} from "../dto/PostSamuraiDTO";
import {PutSamuraiByIdReqBodyDTO, PutSamuraiByIdReqParamsDTO, PutSamuraiByIdResDTO} from "../dto/PutSamuraiDTO";
import handleValidationErrors from "../middlewares/handleValidationErrors";
import {nameFromBodyValidation} from "../middlewares/nameFromBodyValidation";
import {samuraisRepository} from "../repositories/samuraisRepository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types";
import {statusCodes} from "../utils/statusCodes";

export const samuraisRoutes = express.Router()

samuraisRoutes.get("/", (_req: RequestWithQuery<GetSamuraisQueryDTO>, res: Response) => {
	res.status(statusCodes.OK_200).json(
		samuraisRepository.findSamurais()
	)
})
samuraisRoutes.get("/:id", (req: RequestWithParams<GetSamuraiReqParamsDTO>,
                            res: Response<GetSamuraiResDTO>) => {
	let foundSamurai = samuraisRepository.findSamuraiById(req.params.id)

	if (!foundSamurai) {
		res.status(statusCodes.NOT_FOUND_404).json({
			message: "Samurai not found"
		})
		return;
	}
	res.status(statusCodes.OK_200).json(
		foundSamurai
	)
})

samuraisRoutes.post("/",
	nameFromBodyValidation,
	handleValidationErrors,
	(req: RequestWithBody<PostSamuraiReqDTO>,
	 res: Response<PostSamuraiResDTO>) => {
		const createSamuraiResult = samuraisRepository.createSamurai(req.body.name)
		if (!createSamuraiResult.samurai) {
			res.status(statusCodes.BAD_REQUEST_400).json({
				message: createSamuraiResult.message
			})
			return
		}
		res.status(statusCodes.CREATED_201).json(createSamuraiResult)

	})

samuraisRoutes.put("/", (_req: Request, res: Response) => {
	res.status(statusCodes.METHOD_NOT_ALLOWED_405).json({
		message: "Method not allowed"
	})
})
samuraisRoutes.put("/:id", nameFromBodyValidation, handleValidationErrors, (
	req: RequestWithParamsAndBody<PutSamuraiByIdReqParamsDTO, PutSamuraiByIdReqBodyDTO>,
	res: Response<PutSamuraiByIdResDTO>) => {
	const updateSamuraiResult = samuraisRepository.updateSamurai({id: req.params.id, ...req.body})
	if (!updateSamuraiResult.samurai) {
		res.status(statusCodes.BAD_REQUEST_400).json({
			message: updateSamuraiResult.message
		})
		return;
	}
	res.status(statusCodes.OK_200).json(updateSamuraiResult)
})

samuraisRoutes.delete("/", (_req: Request, res: Response) => {
	res.status(statusCodes.METHOD_NOT_ALLOWED_405).json({
		message: "Method not allowed"
	})
})
samuraisRoutes.delete("/:id", (req: RequestWithParams<DeleteSamuraiReqParamsDTO>,
                               res: Response<DeleteSamuraiResDTO>) => {
	const deleteSamuraiResult = samuraisRepository.deleteSamurai(req.params.id)
	if (!deleteSamuraiResult.samurai) {
		res.status(statusCodes.NOT_FOUND_404).json({
			message: deleteSamuraiResult.message
		})
		return;
	}
	res.status(statusCodes.OK_200).json(deleteSamuraiResult)
})
