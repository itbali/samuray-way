import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {RequestWithBody, RequestWithParamsAndBody, RequestWithQuery} from "../types";
import {statusCodes} from "../utils/statusCodes";

function handleValidationErrors<
	Req extends RequestWithBody<any> | RequestWithQuery<any> | RequestWithParamsAndBody<any, any>
>(req: Req, res: Response<any>, next: NextFunction) {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(statusCodes.BAD_REQUEST_400).json({
			message: result.array().map(e => `Error: ${e.msg} in ${e.type}`).join(", ")
		});
		return;
	}
	next();
}

export default handleValidationErrors;
